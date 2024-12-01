import { Result } from "../models/User.js";
import fs from 'fs'
import mongoose from "mongoose";
import path from "path";
import { Scan } from "../models/User.js";

export const uploadFile = async (req, res) => {
  try {
    // Extract the file name from the request
    const fileName = req.body.fileName || 'unknown-scan'; // Fallback if fileName not provided
    
    // More flexible regex to extract scanId
    const scanIdExtractMatch = fileName.match(/([a-zA-Z0-9-_]+)\.json$/);
    
    let extractedScanId;
    if (scanIdExtractMatch) {
      extractedScanId = scanIdExtractMatch[1];
    } else {
      // Generate a random ID if no matching pattern found
      extractedScanId = new mongoose.Types.ObjectId().toString();
    }

    // Validate scanId format (less strict)
    if (extractedScanId.length < 10) {
      return res.status(400).json({ message: 'Invalid scanId format' });
    }

    // Ensure the input is a valid JSON
    if (typeof req.body !== 'object' || req.body === null) {
      return res.status(400).json({ message: 'Invalid JSON input' });
    }

    // Generate a unique filename
    const uniqueFileName = `${extractedScanId}.json`;
    const filePath = path.join('../uploads', uniqueFileName);

    // Ensure upload directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write JSON to file
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');

    const scan = await Scan.findOne({ _id : extractedScanId });

    if(!scan){
      return res.status(404).json({ message:"Scan not found" });
    }

    scan.status="Completed";
    await scan.save();

    // Save the result in the database
    const result = new Result({
      scanId: new mongoose.Types.ObjectId(extractedScanId),
      outputJSON: JSON.stringify(req.body),
      filePath: filePath,
      originalFileName: fileName
    });

    await result.save();

    res.status(201).json({
      message: 'JSON file uploaded and saved',
      resultId: result._id,
      scanId: extractedScanId,
      fileName: uniqueFileName
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ 
      message: 'Error uploading file', 
      error: error.message 
    });
  }
};

export const getfiles = async(req,res)=>{
    try {
        const scanId = req.body;
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
