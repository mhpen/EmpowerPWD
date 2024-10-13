import mongoose from 'mongoose';

const jobAccessibilitySchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
  feature: { type: String, required: true },
  accommodations: { type: String, default: '' }, // Optional
});

export default mongoose.model('JobAccessibility', jobAccessibilitySchema);