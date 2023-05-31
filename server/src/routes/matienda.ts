import { Router } from 'express';
import { createMaTienda, getMaTienda, getMaTiendas, updateMaTienda } from '../controllers/matienda';



const router = Router();

router.get('/', getMaTiendas)
router.get('/:id', getMaTienda)
router.post('/', createMaTienda)
router.put('/:id', updateMaTienda)

export default router;