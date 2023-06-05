import { Router } from 'express';
import { deleteSeRol, getSeRol, getSeRolWhere, getSeRoles, postSeRol, updateSeRol } from '../controllers/serol';


const router = Router();

router.get('/:id', getSeRol)
router.post('/rol', getSeRolWhere)
router.get('/', getSeRoles)
router.delete('/:id', deleteSeRol)
router.post('/', postSeRol)
router.put('/:id', updateSeRol)

export default router;