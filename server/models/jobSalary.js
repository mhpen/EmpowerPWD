import mongoose from 'mongoose';

const jobSalarySchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  currency: { type: String, required: true },
});

export default mongoose.model('JobSalary', jobSalarySchema);