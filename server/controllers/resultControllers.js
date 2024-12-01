import { Result } from "../models/User.js";
import fs from 'fs'
import mongoose from "mongoose";
import path from "path";

 // Replace with the correct path to your Result model

export const uploadFile = async (req, res) => {
  try {
    // Extract the file name (without extension) as scanId
    const fileName = path.basename(req.file.path); // E.g., '674af6d38b90ebf2f9a03067.json'
    const scanIdPart = fileName.split('.')[0]; // Remove the file extension
    const scanId = scanIdPart.split('-')[1];
    console.log(scanId)// Extract '674af6d38b90ebf2f9a03067'

    // Validate scanId
    if (!mongoose.Types.ObjectId.isValid(scanId)) {
      fs.unlinkSync(req.file.path); // Clean up the uploaded file
      return res.status(400).json({ message: 'Invalid scanId in file name' });
    }

    const filePath = req.file.path;

    if (req.file.mimetype === 'application/json') {
      // Handle JSON file
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      // Save the result
      const result = new Result({
        scanId: new mongoose.Types.ObjectId(scanId),
        outputJSON: JSON.stringify(jsonData),
      });

      await result.save();

      // Clean up the uploaded file
      fs.unlinkSync(filePath);

      res.status(201).json({
        message: 'JSON file uploaded and saved',
        resultId: result._id,
        scanId: scanId,
      });
    } else {
      fs.unlinkSync(filePath); // Clean up for unsupported file types
      res.status(400).json({ message: 'Unsupported file type. Only JSON is allowed.' });
    }
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};


export const getfiles = async(req,res)=>{
    try {
        const scanId = new mongoose.Types.ObjectId("64b7f2e56f9f3a0010c12345"); 
        const result = await Result.findOne({scanId});
    
        if (!result) {
          return res.status(404).json({ message: 'Result not found' });
        }
    
        if (result.outputJSON) {
          res.status(200).json({ scanId: result.scanId, outputJSON: JSON.parse(result.outputJSON) });
        } else if (result.outputCSV) {
          res.download(result.outputCSV); // Send the CSV file as a download
        } else {
          res.status(404).json({ message: 'No output found for the given result ID.' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error fetching result', error: error.message });
      }
}
