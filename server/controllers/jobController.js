import Job from '../models/jobs.js';
import JobQualification from '../models/jobQualification.js';
import JobSkill from '../models/jobSkill.js';
import JobSalary from '../models/jobSalary.js';
import JobBenefit from '../models/jobBenefit.js';
import JobAccessibility from '../models/jobAccessibility.js';
import Category from '../models/category.js'; // Import the Category model

// Unified function to save job-related data after filling all pages
export const createJobRelatedData = async (req, res) => {
  const session = await Job.startSession();  // Start a transaction session
  session.startTransaction();  // Begin transaction to ensure atomicity

  try {
    const {
      job, qualifications, skills, salary, benefits, accessibility,
    } = req.body;  // Destructure the data passed from the client

    // Input validation
    if (!job || !job.employerId || !job.title || !job.categoryId) {
      return res.status(400).json({ error: 'Job information is incomplete.' });
    }

    // Save the Job
    const newJob = new Job({
      employerId: job.employerId,
      title: job.title,
      description: job.description,
      location: job.location,
      industry: job.industry,
      employmentType: job.employmentType,
      applicationDeadline: job.applicationDeadline,
      keywords: job.keywords,
      categoryId: job.categoryId,
    });

    const savedJob = await newJob.save({ session });  // Save within the transaction

    // Function to handle document insertion with error handling
    const insertDocuments = async (Model, docs) => {
      if (docs && docs.length > 0) {
        await Model.insertMany(docs, { session });
      }
    };

    // Save Job Qualifications
    await insertDocuments(JobQualification, qualifications.map(q => ({
      jobId: savedJob._id,
      education: q.education,
      experience: q.experience,
    })));

    // Save Job Skills
    await insertDocuments(JobSkill, skills.map(s => ({
      jobId: savedJob._id,
      skillId: s.skillId,
    })));

    // Save Job Salary
    if (salary) {
      if (typeof salary.min !== 'number' || typeof salary.max !== 'number') {
        return res.status(400).json({ error: 'Salary must be a valid number.' });
      }
      const newSalary = new JobSalary({
        jobId: savedJob._id,
        min: salary.min,
        max: salary.max,
        currency: salary.currency,
      });
      await newSalary.save({ session });
    }

    // Save Job Benefits
    await insertDocuments(JobBenefit, benefits.map(b => ({
      jobId: savedJob._id,
      benefit: b.benefit,
    })));

    // Save Job Accessibility
    await insertDocuments(JobAccessibility, accessibility.map(a => ({
      jobId: savedJob._id,
      feature: a.feature,
      accommodations: a.accommodations,
    })));

    // Optionally, you could also check if the category exists in the database
    // If you need to ensure that the categoryId is valid, you can fetch it first
    const categoryExists = await Category.exists({ _id: job.categoryId });
    if (!categoryExists) {
      return res.status(400).json({ error: 'Category does not exist.' });
    }

    // Commit the transaction after all saves
    await session.commitTransaction();
    return res.status(201).json({ message: 'Job and related data saved successfully!' });
  } catch (error) {
    // Abort the transaction if there's an error
    await session.abortTransaction();
    return res.status(500).json({ error: error.message });
  } finally {
    // Ensure session is always ended
    session.endSession();
  }
};
