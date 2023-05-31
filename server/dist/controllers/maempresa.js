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
exports.updateMaEmpresa = exports.getMaEmpresa = void 0;
const maempresa_1 = __importDefault(require("../models/maempresa"));
const getMaEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maempresa = yield maempresa_1.default.findOne();
    if (maempresa) {
        res.json(maempresa);
    }
    else {
        res.status(404).json({
            msg: `No se encontró la empresa`
        });
    }
});
exports.getMaEmpresa = getMaEmpresa;
// export const createMaEmpresa = async (req: Request, res: Response) => {
//     const { body } = req;
//     try {
//         await MaEmpresa.findOrCreate(body);
//         res.json({
//             msg: `La empresa fue agregada con exito!`
//         });
//     } catch (error) {
//         console.log(error);
//         res.json({
//             msg: 'Upss ocurrió un error'
//         });
//     }
// }
const updateMaEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const maempresa = yield maempresa_1.default.findByPk(id);
        if (maempresa) {
            yield maempresa.update(body);
            res.json({
                msg: `El maempresa fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un maempresa con el id ${id}`
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
exports.updateMaEmpresa = updateMaEmpresa;
