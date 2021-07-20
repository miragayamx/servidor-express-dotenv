import express from 'express';
import * as productControler from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import productExists from '../middleware/productExists.js';

const router = express.Router();

//GET
router.get('/productos/listar', productControler.getAllProducts);
router.get('/productos/listar/:id', productExists, productControler.getProduct);
//POST
router.post('/productos/guardar/', upload.single('thumbnail'), productControler.createProduct);
//PUT
router.put('/productos/actualizar/:id', productExists, upload.single('thumbnail'), productControler.updateProduct);
//DELETE
router.delete('/productos/borrar/:id', productExists, productControler.deleteProduct);

export default router;