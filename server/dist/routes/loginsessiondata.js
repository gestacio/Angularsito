"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginsessiondata_1 = require("../controllers/loginsessiondata");
const router = (0, express_1.Router)();
router.get('/:nstore', loginsessiondata_1.getViewLoginSessionData);
exports.default = router;
