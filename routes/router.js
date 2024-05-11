import expres from 'express';

const router = expres.Router();

router.get('/', (req, res)=>{
    console.log("calling");
})


export default router;