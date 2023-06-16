"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginsessiondata_1 = require("../../controllers/views/loginsessiondata");
const router = (0, express_1.Router)();
router.post('/', loginsessiondata_1.getViewLoginSessionData);
exports.default = router;
