import express from 'express';
import * as vistaController from '../controllers/vistaController.js';

const router = express.Router();

router.get('/vista', vistaController.productosVista);
router.get('/registrar', vistaController.productosRegistrar);

export default router;