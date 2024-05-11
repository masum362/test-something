import expres from 'express';
import { addUser, getSingleUser, homePage } from '../controllers/authControllers.js';

const router = expres.Router();

router.get('/', homePage);
router.get("/user/:id",getSingleUser)
router.post("/add-user",addUser);


  


export default router;