import { Router } from 'express';
import { registerUser } from '../controllers/userController.js';

const router = Router();

router.post('/register', (req, res, next) => {
  console.log('Register route hit');
  next();
}, registerUser);

export default router;