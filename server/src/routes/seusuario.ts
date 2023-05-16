import { Router } from 'express';
import { postLoginSeUsuario, getSeUsuario, getSeUsuarios, postSeUsuario, updateSeUsuario, deleteSeUsuario } from '../controllers/seusuario';


const router = Router();

router.post('/login/', postLoginSeUsuario)
router.get('/:id', getSeUsuario)
router.get('/:', getSeUsuarios)
router.delete('/:id', deleteSeUsuario)
router.post('/', postSeUsuario)
router.put('/:id', updateSeUsuario)

export default router;