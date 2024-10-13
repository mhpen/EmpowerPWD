import mongoose from 'mongoose';

const qualificationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
  education: { type: String, required: true },
  experience: { type: Number, required: true },
});

export default mongoose.model('JobQualification', qualificationSchema);