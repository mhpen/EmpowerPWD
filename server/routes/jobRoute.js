import { Router } from 'express';
import { createJobRelatedData } from '../controllers/jobController.js';

const router = Router();

// Unified POST route for saving all job-related data at once
router.post('/job-related-data', (req, res, next) => {
    console.log('Job-related data route hit');
    next();  // Call the next middleware function
}, createJobRelatedData);

// Export the router
export default router;
