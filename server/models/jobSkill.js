import mongoose from 'mongoose';

const jobSkillsSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skills', required: true },
});

export default mongoose.model('JobSkill', jobSkillsSchema);