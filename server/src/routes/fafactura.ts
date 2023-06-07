import { Router } from 'express';
import { getFaFactura, getFaFacturas, postFaFactura, updateFaFactura, deleteFaFactura, generateFaFactura, getCountFaFacturas } from '../controllers/fafactura';


const router = Router();

router.get('/', getFaFacturas)
router.get('/count', getCountFaFacturas)
router.get('/:id', getFaFactura)
router.get('/generar/:id', generateFaFactura)
// router.delete('/:id', deleteFaFactura)
router.post('/', postFaFactura)
router.put('/:id', updateFaFactura)

export default router;