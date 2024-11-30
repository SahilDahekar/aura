import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const scanSchema = new mongoose.Schema({
    userEmail: { type: String, },
    tools: [{ type: String }],
    url:{type:String,required:true},// Example: ['OWASP Zap', 'Nikto']
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
  });

  const resultSchema = new mongoose.Schema({
    scanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scan' },
    outputCSV: String,
    outputJSON: String,
  });

export const Scan = mongoose.model('Scan',scanSchema)
export const User = mongoose.model('User',userSchema)
export const Result = mongoose.model('Result',resultSchema)

