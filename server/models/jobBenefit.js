import mongoose from 'mongoose';

const jobBenefitsSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
  benefit: { type: String, required: true },
});

export default mongoose.model('JobBenefit', jobBenefitsSchema);