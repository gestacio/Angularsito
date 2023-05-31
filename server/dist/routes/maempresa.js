"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maempresa_1 = require("../controllers/maempresa");
const router = (0, express_1.Router)();
router.get('/', maempresa_1.getMaEmpresa);
exports.default = router;
