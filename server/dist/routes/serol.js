"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serol_1 = require("../controllers/serol");
const router = (0, express_1.Router)();
router.get('/:id', serol_1.getSeRol);
router.post('/rol', serol_1.getSeRolWhere);
router.get('/', serol_1.getSeRoles);
router.delete('/:id', serol_1.deleteSeRol);
router.post('/', serol_1.postSeRol);
router.put('/:id', serol_1.updateSeRol);
exports.default = router;