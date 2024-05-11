import expres from 'express';
import { homePage } from '../controllers/authControllers.js';

const router = expres.Router();

router.get('/', homePage);


export default router;