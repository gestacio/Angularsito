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
exports.updateMaTienda = exports.createMaTienda = exports.getMaTiendas = exports.getMaTienda = void 0;
const matienda_1 = __importDefault(require("../models/matienda"));
const getMaTienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nstore } = req.params;
    const matienda = yield matienda_1.default.findOne({ where: { nstore: nstore } });
    if (matienda) {
        res.json(matienda);
    }
    else {
        res.status(404).json({
            msg: `No se encontró la empresa`
        });
    }
});
exports.getMaTienda = getMaTienda;
const getMaTiendas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matienda = yield matienda_1.default.findAll();
    res.json(matienda);
});
exports.getMaTiendas = getMaTiendas;
const createMaTienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield matienda_1.default.findOrCreate(body);
        res.json({
            msg: `La empresa fue agregada con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
});
exports.createMaTienda = createMaTienda;
const updateMaTienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const matienda = yield matienda_1.default.findByPk(id);
        if (matienda) {
            yield matienda.update(body);
            res.json({
                msg: `El matienda fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un matienda con el id ${id}`
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
exports.updateMaTienda = updateMaTienda;
