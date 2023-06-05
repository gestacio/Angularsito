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
exports.sellFaVenta = exports.updateFaVenta = exports.postFaVenta = exports.deleteFaVenta = exports.getFaVenta = exports.postFaVentasWhere = exports.getFaVentas = void 0;
const faventa_1 = __importDefault(require("../models/faventa"));
const connection_1 = __importDefault(require("../db/connection"));
const getFaVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listFaVentas = yield faventa_1.default.findAll();
    res.json(listFaVentas);
});
exports.getFaVentas = getFaVentas;
const postFaVentasWhere = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const listFaVentasWhere = yield faventa_1.default.findAll({ where: { nticket: body.nticket } });
    res.json(listFaVentasWhere);
});
exports.postFaVentasWhere = postFaVentasWhere;
const getFaVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const faventa = yield faventa_1.default.findByPk(id);
    if (faventa) {
        res.json(faventa);
    }
    else {
        res.status(404).json({
            msg: `No existe una venta con el id ${id}`
        });
    }
});
exports.getFaVenta = getFaVenta;
const deleteFaVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const faventa = yield faventa_1.default.findByPk(id);
    if (faventa) {
        yield faventa.destroy();
        res.json('el faventao fue eliminado con éxito');
    }
    else {
        res.status(404).json({
            msg: `No existe un faventao con el id ${id}`
        });
    }
});
exports.deleteFaVenta = deleteFaVenta;
const postFaVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield faventa_1.default.create(body);
        res.json({
            msg: `La venta fue agregada con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
});
exports.postFaVenta = postFaVenta;
const updateFaVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const faventa = yield faventa_1.default.findByPk(id);
        if (faventa) {
            yield faventa.update(body);
            res.json({
                msg: `El faventao fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un faventao con el id ${id}`
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
exports.updateFaVenta = updateFaVenta;
const sellFaVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const faventa = yield faventa_1.default.findByPk(id);
        if (faventa) {
            yield connection_1.default.query(`UPDATE mafaventaos SET stock = stock - 1 where id = ${id}`);
            res.json({
                msg: `El faventao fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un faventao con el id ${id}`
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
exports.sellFaVenta = sellFaVenta;
