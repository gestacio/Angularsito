import { Router } from 'express';
import { getMaEmpresa } from '../controllers/maempresa';


const router = Router();

router.get('/', getMaEmpresa)

export default router;