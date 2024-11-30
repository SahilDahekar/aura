import { Result } from "../models/User.js";
import fs from 'fs'
import mongoose from "mongoose";



export const uploadFile = async(req,res)=>{
    try {
        const scanId = new mongoose.Types.ObjectId("64b7f2e56f9f3a0010c12345"); 
    
        // Ensure scanId is provided
        if (!scanId) {
          return res.status(400).json({ message: 'scanId is required' });
        }
    
        const filePath = req.file.path;
    
        if (req.file.mimetype === 'application/json') {
          // Handle JSON file
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const jsonData = JSON.parse(fileContent);
    
          const result = new Result({
            scanId,
            outputJSON: JSON.stringify(jsonData),
          });
    
          await result.save();
    
          // Clean up the uploaded file from the server
          fs.unlinkSync(filePath);
    
          res.status(201).json({ message: 'JSON file uploaded and saved', resultId: result._id });
        } else if (req.file.mimetype === 'text/csv') {
          // Handle CSV file
          const result = new Result({
            scanId,
            outputCSV: filePath, // Save the file path for later use
          });
    
          await result.save();
    
          res.status(201).json({ message: 'CSV file uploaded and saved', resultId: result._id });
        } else {
          // Unsupported file type
          fs.unlinkSync(filePath); // Clean up
          res.status(400).json({ message: 'Unsupported file type. Only JSON and CSV are allowed.' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
      }
}

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
