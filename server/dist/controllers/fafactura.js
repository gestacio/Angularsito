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
exports.updateFaFactura = exports.postFaFactura = exports.deleteFaFactura = exports.getFaFacturas = exports.generateFaFactura = exports.getFaFactura = void 0;
const fafactura_1 = __importDefault(require("../models/fafactura"));
const maempresa_1 = __importDefault(require("../models/maempresa"));
const matienda_1 = __importDefault(require("../models/matienda"));
const macliente_1 = __importDefault(require("../models/macliente"));
const seusuario_1 = __importDefault(require("../models/seusuario"));
const faventa_1 = __importDefault(require("../models/faventa"));
const connection_1 = __importDefault(require("../db/connection"));
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
// export const postFindOneFaFactura = async (req: Request, res: Response) => {
//     const { body } = req;
//     const fafactura = await FaFactura.findOne({ where: { createdAt: body.createdAt } })
//     if (fafactura) {
//         res.json(fafactura);
//     } else {
//         res.status(401).json({
//             msg: `Credenciales inválidas, no existe el usuario: ${body.xusername}`
//         });
//     }
// }
