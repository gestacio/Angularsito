import { Router } from 'express';
import { deleteFaVenta, getFaVenta, getFaVentas, postFaVenta, updateFaVenta } from '../controllers/faventa';


const router = Router();

router.get('/', getFaVentas)
router.get('/:nticket', getFaVenta)
router.delete('/:nticket', deleteFaVenta)
router.post('/', postFaVenta)
router.put('/:nticket', updateFaVenta)

export default router;