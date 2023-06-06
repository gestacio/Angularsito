import { Router } from 'express';
import { postLoginFaFactura, getFaFactura, getFaFacturas, postFaFactura, updateFaFactura, deleteFaFactura } from '../controllers/fafactura';


const router = Router();

router.get('/:id', getFaFactura)
router.get('/', getFaFacturas)
// router.delete('/:id', deleteFaFactura)
router.post('/', postFaFactura)
router.put('/:id', updateFaFactura)

export default router;