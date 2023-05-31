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
const express_1 = __importDefault(require("express"));
const producto_1 = __importDefault(require("../routes/producto"));
const seusuario_1 = __importDefault(require("../routes/seusuario"));
const maempresa_1 = __importDefault(require("../routes/maempresa"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
// import sequelize from '../db/connection';
const seusuario_2 = __importDefault(require("./seusuario"));
const producto_2 = __importDefault(require("./producto"));
const maempresa_2 = __importDefault(require("./maempresa"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/maempresa', maempresa_1.default);
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/seusuario', seusuario_1.default);
    }
    midlewares() {
        // Parseamos el body
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('base de datos conectada');
                // await sequelize.sync({ force: true });
                yield maempresa_2.default.sync();
                yield seusuario_2.default.sync();
                yield producto_2.default.sync();
                yield maempresa_2.default.findOrCreate({
                    where: { xrif: "J-000202001" },
                    defaults: {
                        xrif: "J-000202001",
                        xshortname: "FARMATODO, C.A.",
                        xlongname: "FARMATODO, Compañia Anonima",
                        xaddress: "Av. Los Guayabitos, CC Expreso Baruta, Nivel 5, Of. Unica, Urb. La Trinidad (Sector Puerta Azul), Caracas."
                    }
                });
                // console.log("All models were synchronized successfully.");
                console.log('\x1b[32m --- \x1b[0m');
                console.log('\x1b[32m All models were synchronized successfully.! \x1b[0m');
                console.log('\x1b[32m --- \x1b[0m');
            }
            catch (error) {
                console.log(error);
                console.log('Error - Ejecución con base de datos');
            }
        });
    }
}
exports.default = Server;
