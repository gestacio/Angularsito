"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matienda_1 = require("../controllers/matienda");
const router = (0, express_1.Router)();
router.get('/', matienda_1.getMaTiendas);
router.get('/:id', matienda_1.getMaTienda);
router.post('/', matienda_1.createMaTienda);
router.put('/:id', matienda_1.updateMaTienda);
exports.default = router;