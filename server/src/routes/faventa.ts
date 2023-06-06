import { Router } from 'express';
import { deleteFaVenta, getFaVenta, getFaVentas, postFaVenta, updateFaVenta } from '../controllers/faventa';


const router = Router();

router.get('/', getFaVentas)
router.get('/:id', getFaVenta)
// router.delete('/:nticket', deleteFaVenta)
router.post('/', postFaVenta)
router.put('/:id', updateFaVenta)

export default router;