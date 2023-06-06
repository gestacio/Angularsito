"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fafactura_1 = require("../controllers/fafactura");
const router = (0, express_1.Router)();
router.get('/:id', fafactura_1.getFaFactura);
router.get('/', fafactura_1.getFaFacturas);
// router.delete('/:id', deleteFaFactura)
router.post('/', fafactura_1.postFaFactura);
router.put('/:id', fafactura_1.updateFaFactura);
exports.default = router;
