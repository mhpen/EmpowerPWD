import { Router } from 'express';
import { logUser } from '../controllers/userController.js';

const router = Router();

// Login route
router.post('/login', (req, res, next) =>{
   console.log('Login route hit');
   next();
}, logUser);

export default router;
