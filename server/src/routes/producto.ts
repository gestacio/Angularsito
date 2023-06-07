import { Router } from 'express';
import { deleteProduct, getProduct, getProducts, postProductsWhere, postProduct, updateProduct, sellProduct, getCountProducts } from '../controllers/producto';


const router = Router();

router.get('/', getProducts)
router.get('/count', getCountProducts)
router.get('/:id', getProduct)
// router.post('/sell/', postProductsWhere)
router.delete('/:id', deleteProduct)
router.post('/', postProduct)
router.put('/:id', updateProduct)
router.put('/sell/:id', sellProduct)

export default router;