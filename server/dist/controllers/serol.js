"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSeRol = exports.postSeRol = exports.deleteSeRol = exports.getSeRoles = exports.getSeRol = exports.getSeRolWhere = void 0;
const serol_1 = __importDefault(require("../models/serol"));
const getSeRolWhere = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const serol = yield serol_1.default.findOne({ where: { xrol: body.xrol } });
    if (serol) {
        res.json(serol);
    }
    else {
        res.status(401).json({
            msg: `Credenciales inválidas, no existe el rol: ${body.xrol}`
        });
    }
});
exports.getSeRolWhere = getSeRolWhere;
const getSeRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serol = yield serol_1.default.findByPk(id);
    if (serol) {
        res.json(serol);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getSeRol = getSeRol;
const getSeRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listSeRols = yield serol_1.default.findAll();
    res.json(listSeRols);
});
exports.getSeRoles = getSeRoles;
const deleteSeRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serol = yield serol_1.default.findByPk(id);
    if (serol) {
        yield serol.destroy();
        res.json('el usuarioo fue eliminado con éxito');
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.deleteSeRol = deleteSeRol;
const postSeRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield serol_1.default.create(body);
        res.json({
            msg: `El usuario fue agregado con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
});
exports.postSeRol = postSeRol;
const updateSeRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const serol = yield serol_1.default.findByPk(id);
        if (serol) {
            yield serol.update(body);
            res.json({
                msg: `El serol fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un serol con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
});
exports.updateSeRol = updateSeRol;
