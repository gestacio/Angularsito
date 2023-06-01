import { Router } from 'express';
import { deleteMaCliente, getMaCliente, getMaClientes, postMaCliente, updateMaCliente } from '../controllers/macliente';


const router = Router();

router.get('/', getMaClientes)
router.get('/:xdni', getMaCliente)
router.delete('/:id', deleteMaCliente)
router.post('/', postMaCliente)
router.put('/:id', updateMaCliente)

export default router;