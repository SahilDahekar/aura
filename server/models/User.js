import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const scanSchema = new mongoose.Schema({
  userEmail: { type: String }, 
  auraId: { type: String, required: true }, // Used to find scans
  name: { type: String },
  tool: [{ type: String }], // Example: ['OWASP Zap', 'Nikto']
  url: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  resultJSON: { type: mongoose.Schema.Types.Mixed }, // New field to store JSON result
});

  const resultSchema = new mongoose.Schema({
    scanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scan' },
    outputCSV: String,
    outputJSON: String,
  });

export const Scan = mongoose.model('Scan',scanSchema)
export const User = mongoose.model('User',userSchema)
export const Result = mongoose.model('Result',resultSchema)

