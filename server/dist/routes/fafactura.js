"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fafactura_1 = require("../controllers/fafactura");
const router = (0, express_1.Router)();
router.get('/', fafactura_1.getFaFacturas);
router.get('/count', fafactura_1.getCountFaFacturas);
router.get('/months', fafactura_1.getCountMonthsFaFacturas);
router.get('/monthStores', fafactura_1.getCountMonthStoresFaFacturas);
router.get('/:id', fafactura_1.getFaFactura);
router.get('/generar/:id', fafactura_1.generateFaFactura);
// router.delete('/:id', deleteFaFactura)
router.post('/', fafactura_1.postFaFactura);
router.put('/:id', fafactura_1.updateFaFactura);
exports.default = router;
