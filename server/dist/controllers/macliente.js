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
exports.getChartMaClientes = exports.getCountMaClientes = exports.sellMaCliente = exports.updateMaCliente = exports.postMaCliente = exports.deleteMaCliente = exports.getMaClientes = exports.getMaCliente = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const macliente_1 = __importDefault(require("../models/macliente"));
const getMaCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { xdni } = req.params;
    const macliente = yield macliente_1.default.findOne({ where: { xdni: xdni } });
    if (macliente) {
        res.json(macliente);
    }
    else {
        res.json({
            xdni: '',
            xbusinessname: '',
            xtelf: '',
            xshortaddress: '',
            xlongaddress: '',
        });
    }
});
exports.getMaCliente = getMaCliente;
const getMaClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMaCliente = yield macliente_1.default.findAll();
    res.json(listMaCliente);
});
exports.getMaClientes = getMaClientes;
const deleteMaCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const macliente = yield macliente_1.default.findByPk(id);
    if (macliente) {
        yield macliente.destroy();
        res.json('el macliente fue eliminado con éxito');
    }
    else {
        res.status(404).json({
            msg: `No existe un macliente con el id ${id}`
        });
    }
});
exports.deleteMaCliente = deleteMaCliente;
const postMaCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield macliente_1.default.create(body);
        res.json({
            msg: `El macliente fue agregado con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
});
exports.postMaCliente = postMaCliente;
const updateMaCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const macliente = yield macliente_1.default.findByPk(id);
        if (macliente) {
            yield macliente.update(body);
            res.json({
                msg: `El macliente fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un macliente con el id ${id}`
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
exports.updateMaCliente = updateMaCliente;
const sellMaCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const macliente = yield macliente_1.default.findByPk(id);
        if (macliente) {
            yield connection_1.default.query(`UPDATE mamaclientes SET stock = stock - 1 where id = ${id}`);
            res.json({
                msg: `El macliente fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un macliente con el id ${id}`
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
exports.sellMaCliente = sellMaCliente;
const getCountMaClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countMaClientes = yield macliente_1.default.count();
        if (countMaClientes) {
            res.json({
                countMaClientes: countMaClientes,
            });
        }
        else {
            res.status(404).json({
                msg: `No existen clientes en BDD`
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
exports.getCountMaClientes = getCountMaClientes;
const getChartMaClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maclientes = yield macliente_1.default.findAll({
        // attributes: {
        //     exclude: [
        //         'maempresaId',
        //         'matiendaId',
        //         'maclienteId',
        //         'seusuarioId',
        //         'updatedAt',
        //     ]
        // },
        });
        if (maclientes) {
            res.json({
                maclientes: maclientes,
            });
        }
        else {
            res.status(404).json({
                msg: `No existen clientes en BDD`
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
exports.getChartMaClientes = getChartMaClientes;
