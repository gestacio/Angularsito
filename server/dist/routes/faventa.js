"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faventa_1 = require("../controllers/faventa");
const router = (0, express_1.Router)();
router.get('/', faventa_1.getFaVentas);
router.get('/:nticket', faventa_1.getFaVenta);
// router.delete('/:nticket', deleteFaVenta)
router.post('/', faventa_1.postFaVenta);
router.put('/:nticket', faventa_1.updateFaVenta);
exports.default = router;
