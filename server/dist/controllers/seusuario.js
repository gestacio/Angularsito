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
exports.updateSeUsuario = exports.postSeUsuario = exports.deleteSeUsuario = exports.getSeUsuarios = exports.getSeUsuario = exports.postLoginSeUsuario = void 0;
const seusuario_1 = __importDefault(require("../models/seusuario"));
const postLoginSeUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const seusuario = yield seusuario_1.default.findOne({ where: { xusername: body.xusername, xpassword: body.xpassword } });
    if (seusuario) {
        res.json(seusuario);
    }
    else {
        res.status(401).json({
            msg: `Credenciales inválidas, no existe el usuario: ${body.xusername}`
        });
    }
});
exports.postLoginSeUsuario = postLoginSeUsuario;
const getSeUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const seusuario = yield seusuario_1.default.findByPk(id);
    if (seusuario) {
        res.json(seusuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getSeUsuario = getSeUsuario;
const getSeUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listSeUsuarios = yield seusuario_1.default.findAll();
    res.json(listSeUsuarios);
});
exports.getSeUsuarios = getSeUsuarios;
const deleteSeUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const seusuario = yield seusuario_1.default.findByPk(id);
    if (seusuario) {
        yield seusuario.destroy();
        res.json('el usuarioo fue eliminado con éxito');
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.deleteSeUsuario = deleteSeUsuario;
const postSeUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield seusuario_1.default.create(body);
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
exports.postSeUsuario = postSeUsuario;
const updateSeUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const seusuario = yield seusuario_1.default.findByPk(id);
        if (seusuario) {
            yield seusuario.update(body);
            res.json({
                msg: `El seusuario fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un seusuario con el id ${id}`
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
exports.updateSeUsuario = updateSeUsuario;
