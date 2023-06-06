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
exports.updateFaFactura = exports.postFaFactura = exports.deleteFaFactura = exports.getFaFacturas = exports.getFaFactura = exports.postLoginFaFactura = void 0;
const fafactura_1 = __importDefault(require("../models/fafactura"));
const maempresa_1 = __importDefault(require("../models/maempresa"));
const matienda_1 = __importDefault(require("../models/matienda"));
const macliente_1 = __importDefault(require("../models/macliente"));
const seusuario_1 = __importDefault(require("../models/seusuario"));
const faventa_1 = __importDefault(require("../models/faventa"));
const postLoginFaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const fafactura = yield fafactura_1.default.findOne({ where: { xusername: body.xusername, xpassword: body.xpassword } });
    if (fafactura) {
        res.json(fafactura);
    }
    else {
        res.status(401).json({
            msg: `Credenciales inválidas, no existe el usuario: ${body.xusername}`
        });
    }
});
exports.postLoginFaFactura = postLoginFaFactura;
const getFaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fafactura = yield fafactura_1.default.findByPk(id);
    if (fafactura) {
        res.json(fafactura);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getFaFactura = getFaFactura;
const getFaFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listFaFacturas = yield fafactura_1.default.findAll({
        include: [
            {
                model: maempresa_1.default
            },
            {
                model: matienda_1.default,
            },
            {
                model: macliente_1.default
            },
            {
                model: seusuario_1.default
            },
            {
                model: faventa_1.default
            }
        ]
    });
    res.json(listFaFacturas);
});
exports.getFaFacturas = getFaFacturas;
const deleteFaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fafactura = yield fafactura_1.default.findByPk(id);
    if (fafactura) {
        yield fafactura.destroy();
        res.json('el usuarioo fue eliminado con éxito');
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.deleteFaFactura = deleteFaFactura;
const postFaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield fafactura_1.default.create(body);
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
exports.postFaFactura = postFaFactura;
const updateFaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const fafactura = yield fafactura_1.default.findByPk(id);
        if (fafactura) {
            yield fafactura.update(body);
            res.json({
                msg: `El FaFactura fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un FaFactura con el id ${id}`
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
exports.updateFaFactura = updateFaFactura;
