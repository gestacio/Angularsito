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
exports.getCountMonthStoresFaFacturas = exports.getCountMonthsFaFacturas = exports.getCountFaFacturas = exports.updateFaFactura = exports.postFaFactura = exports.deleteFaFactura = exports.getFaFacturas = exports.generateFaFactura = exports.getFaFactura = void 0;
const fafactura_1 = __importDefault(require("../models/fafactura"));
const maempresa_1 = __importDefault(require("../models/maempresa"));
const matienda_1 = __importDefault(require("../models/matienda"));
const macliente_1 = __importDefault(require("../models/macliente"));
const seusuario_1 = __importDefault(require("../models/seusuario"));
const faventa_1 = __importDefault(require("../models/faventa"));
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const getFaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fafactura = yield fafactura_1.default.findByPk(id, {
        include: [
            {
                model: maempresa_1.default,
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
const generateFaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fafactura = yield fafactura_1.default.findByPk(id, {
        attributes: {
            exclude: [
                'maempresaId',
                'matiendaId',
                'maclienteId',
                'seusuarioId',
                'updatedAt',
            ]
        },
        include: [
            {
                model: maempresa_1.default,
                attributes: {
                    exclude: [
                        'id',
                        'xlongname',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            },
            {
                model: matienda_1.default,
                attributes: {
                    exclude: [
                        'id',
                        'idempresa',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            },
            {
                model: macliente_1.default,
                attributes: {
                    exclude: [
                        'id',
                        'xtelf',
                        'xshortaddress',
                        'xlongaddress',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            },
            {
                model: seusuario_1.default,
                attributes: {
                    exclude: [
                        'id',
                        'xcodeemployee',
                        'xusername',
                        'xpassword',
                        'serolId',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            },
            {
                model: faventa_1.default,
                attributes: {
                    exclude: [
                        'fafacturaId',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            }
        ]
    });
    if (fafactura) {
        res.json(fafactura);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.generateFaFactura = generateFaFactura;
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
// export const postFaFactura = async (req: Request, res: Response) => {
//     const { body } = req;
//     try {
//         await FaFactura.create(body);
//         res.json({
//             msg: `El usuario fue agregado con exito!`
//         });
//     } catch (error) {
//         console.log(error);
//         res.json({
//             msg: 'Upss ocurrió un error'
//         });
//     }
// }
const postFaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const ncaja = body.ncaja;
    const mneto = body.mneto;
    const miva = body.miva;
    const mtotal = body.mtotal;
    const maempresaId = body.maempresaId;
    const matiendaId = body.matiendaId;
    const maclienteId = body.maclienteId;
    const seusuarioId = body.seusuarioId;
    try {
        const responseInsert = yield connection_1.default.query(`INSERT INTO fafacturas (ncaja, mneto, miva, mtotal, maempresaId, matiendaId, maclienteId, seusuarioId)
            VALUES (${ncaja}, ${mneto}, ${miva}, ${mtotal}, ${maempresaId}, ${matiendaId}, ${maclienteId}, ${seusuarioId});
            
            SELECT id FROM fafacturas WHERE id = SCOPE_IDENTITY();
            `);
        // # SELECT SCOPE_IDENTITY();
        const id = responseInsert[0][0];
        res.json({
            msg: `La factura ha sido ingresada`,
            id: id,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error',
            error: error,
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
const getCountFaFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    try {
        const countAllFaFacturas = yield fafactura_1.default.count();
        const countThisMonthFaFacturas = yield connection_1.default.query(`
            --SELECT count(*) as value, '' as name FROM fafacturas 
            --LEFT JOIN matiendas on fafacturas.matiendaId = matiendas.id
            --WHERE MONTH(fafacturas.createdAt) = ${month} and YEAR(fafacturas.createdAt) = ${year}
            select count(id) as value, 'Opalo' as name from fafacturas 
            where MONTH(createdAt) = ${month} and YEAR(createdAt) = ${year} and matiendaId = 1
            `, { type: sequelize_1.QueryTypes.SELECT });
        // const countFaFacturas = await FaFactura.findAll({
        //     attributes: {
        //         include: [
        //             [sequelize.literal(`
        //             `),
        //                 'ThisMonth'
        //             ]
        //         ]
        //     }
        // })
        if (countAllFaFacturas && countThisMonthFaFacturas) {
            res.json({
                "countAllFaFacturas": countAllFaFacturas,
                "countThisMonthFaFacturas": countThisMonthFaFacturas[0]
            });
        }
        else {
            res.status(404).json({
                msg: `No existen facturas en BDD`
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
exports.getCountFaFacturas = getCountFaFacturas;
const getCountMonthsFaFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = new Date().getFullYear();
    try {
        const series = yield connection_1.default.query(`
            SET language 'Español'
            SELECT    COUNT(*) as value, 
            DATENAME(MONTH, MAX(createdAt)) as name
            FROM      fafacturas
            WHERE     YEAR(createdAt) = ${year}
            and matiendaId = 1
            GROUP BY  MONTH(createdAt), YEAR(createdAt)
            ORDER BY YEAR(createdAt), MONTH(createdAt)
            `);
        if (series) {
            res.json({
                "name": "Opalo",
                "series": series[0]
            });
        }
        else {
            res.status(404).json({
                msg: `No existen facturas en BDD`
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
exports.getCountMonthsFaFacturas = getCountMonthsFaFacturas;
const getCountMonthStoresFaFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    try {
        const ventaMesActualPorTienda = yield connection_1.default.query(`
            select count(fafacturas.id) as value, matiendas.xname as name from fafacturas 
            INNER JOIN matiendas on fafacturas.matiendaId = matiendas.id
            where MONTH(fafacturas.createdAt) = ${month} and YEAR(fafacturas.createdAt) = ${year}
            group by matiendas.xname
            order by count(fafacturas.id) DESC
            `, { type: sequelize_1.QueryTypes.SELECT });
        if (ventaMesActualPorTienda) {
            res.json(ventaMesActualPorTienda);
        }
        else {
            res.status(404).json({
                msg: `No existen facturas en BDD`
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
exports.getCountMonthStoresFaFacturas = getCountMonthStoresFaFacturas;
