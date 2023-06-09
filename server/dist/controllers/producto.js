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
exports.getCountProducts = exports.sellProduct = exports.updateProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.postProductsWhere = exports.getProducts = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const connection_1 = __importDefault(require("../db/connection"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield producto_1.default.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
const postProductsWhere = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("******** holita *******");
    const { body } = req;
    console.log(body);
    const listProductsWhere = yield producto_1.default.findAll({ where: { name: body.name } });
    res.json(listProductsWhere);
});
exports.postProductsWhere = postProductsWhere;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (product) {
        yield product.destroy();
        res.json('el producto fue eliminado con éxito');
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
});
exports.deleteProduct = deleteProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield producto_1.default.create(body);
        res.json({
            msg: `El producto fue agregado con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
});
exports.postProduct = postProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const product = yield producto_1.default.findByPk(id);
        if (product) {
            yield product.update(body);
            res.json({
                msg: `El producto fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
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
exports.updateProduct = updateProduct;
const sellProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const product = yield producto_1.default.findByPk(id);
        if (product) {
            yield connection_1.default.query(`UPDATE maproductos SET stock = stock - 1 where id = ${id}`);
            res.json({
                msg: `El producto fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
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
exports.sellProduct = sellProduct;
const getCountProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countProducts = yield producto_1.default.count();
        if (countProducts) {
            res.json({
                countProducts: countProducts,
            });
        }
        else {
            res.status(404).json({
                msg: `No existen productos en BDD`
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
exports.getCountProducts = getCountProducts;
