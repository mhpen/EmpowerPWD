import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employers', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, enum: ['Remote', 'Onsite', 'Hybrid'], required: true },
    industry: { type: String, required: true },
    employmentType: { type: String, enum: ['Fulltime', 'Part-time', 'Contract'], required: true },
    applicationDeadline: { type: Date, required: true },
    keywords: { type: [String], required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobCategories', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const job = mongoose.model('job', jobSchema);

export default job;
