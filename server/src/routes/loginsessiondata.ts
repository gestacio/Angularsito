import { Router } from 'express';
import { getViewLoginSessionData } from '../controllers/loginsessiondata';
import cors from 'cors';


const router = Router();

router.get('/:nstore', getViewLoginSessionData);

export default router;