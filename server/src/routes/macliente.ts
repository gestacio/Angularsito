import { Router } from 'express';
import { deleteMaCliente, getChartMaClientes, getCountMaClientes, getMaCliente, getMaClientes, postMaCliente, updateMaCliente } from '../controllers/macliente';


const router = Router();

router.get('/', getMaClientes)
router.get('/chart', getChartMaClientes)
router.get('/count', getCountMaClientes)
router.get('/:xdni', getMaCliente)
router.delete('/:id', deleteMaCliente)
router.post('/', postMaCliente)
router.put('/:id', updateMaCliente)

export default router;