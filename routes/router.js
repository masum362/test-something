import expres from 'express';
import { addUser, homePage } from '../controllers/authControllers.js';

const router = expres.Router();

router.get('/', homePage);
router.post("/add-user",addUser);


  


export default router;