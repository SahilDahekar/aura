import { Result } from "../models/User.js";
import fs from 'fs'
import mongoose from "mongoose";
import path from "path";
import { Scan } from "../models/User.js";

export const uploadFile = async (req, res) => {
  try {

    const jsonData = req.body;


    if (typeof jsonData !== 'object' || jsonData === null) {
      return res.status(400).json({ message: 'Invalid JSON input' });
    }

    const auraId = jsonData.scanid;
    if (!auraId) {
      return res.status(400).json({ message: 'Aura ID (scanid) is required in the JSON' });
    }


    const scan = await Scan.findOne({ auraId });
    if (!scan) {
      return res.status(404).json({ message: `Scan with auraId ${auraId} not found` });
    }


    scan.status = 'Completed';
    scan.resultJSON = jsonData; // Add resultJSON field to store the JSON
    await scan.save();

    res.status(200).json({
      message: 'JSON data processed and saved successfully',
      scanId: scan._id,
      auraId: auraId,
      status: scan.status,
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({
      message: 'Error uploading JSON data',
      error: error.message,
    });
  }
};

export const getfiles = async(req,res)=>{
    try {
        const { scanId } = req.body;
        const result = await Scan.findOne({auraId : scanId});
    
        if (!result) {
          return res.status(404).json({ message: 'Result not found' });
        }
    
        return res.status(200).send(result.resultJSON)
      } catch (error) {
        res.status(500).json({ message: 'Error fetching result', error: error.message });
      }
}
