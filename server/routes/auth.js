import express from 'express';
import { signin, signup } from '../controllers/authController';
import { validateSignupParams, validateSigninParams } from '../middleware/validator';

const router = express.Router();
router.post('/signup', validateSignupParams, signup);
// router.post('/signin', validateSigninParams, signin);
export default router;
