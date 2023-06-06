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
const producto_1 = __importDefault(require("./routes/producto"));
const seusuario_1 = __importDefault(require("./routes/seusuario"));
const maempresa_1 = __importDefault(require("./routes/maempresa"));
const matienda_1 = __importDefault(require("./routes/matienda"));
const macliente_1 = __importDefault(require("./routes/macliente"));
const serol_1 = __importDefault(require("./routes/serol"));
const faventa_1 = __importDefault(require("./routes/faventa"));
const fafactura_1 = __importDefault(require("./routes/fafactura"));
const connection_1 = __importDefault(require("./db/connection"));
const cors_1 = __importDefault(require("cors"));
// import sequelize from '../db/connection';
const seusuario_2 = __importDefault(require("./models/seusuario"));
const producto_2 = __importDefault(require("./models/producto"));
const maempresa_2 = __importDefault(require("./models/maempresa"));
const matienda_2 = __importDefault(require("./models/matienda"));
const macliente_2 = __importDefault(require("./models/macliente"));
const serol_2 = __importDefault(require("./models/serol"));
const faventa_2 = __importDefault(require("./models/faventa"));
const fafactura_2 = __importDefault(require("./models/fafactura"));
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
        this.app.use('/api/maclientes', macliente_1.default);
        this.app.use('/api/maempresas', maempresa_1.default);
        this.app.use('/api/matiendas', matienda_1.default);
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/seroles', serol_1.default);
        this.app.use('/api/seusuarios', seusuario_1.default);
        this.app.use('/api/faventas', faventa_1.default);
        this.app.use('/api/fafacturas', fafactura_1.default);
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
                yield maempresa_2.default.hasMany(fafactura_2.default);
                yield matienda_2.default.sync();
                yield matienda_2.default.hasMany(fafactura_2.default);
                yield macliente_2.default.sync();
                yield macliente_2.default.hasMany(fafactura_2.default);
                yield serol_2.default.sync();
                yield serol_2.default.hasMany(seusuario_2.default);
                yield seusuario_2.default.sync();
                yield seusuario_2.default.hasMany(fafactura_2.default);
                yield seusuario_2.default.belongsTo(serol_2.default);
                yield producto_2.default.sync();
                yield fafactura_2.default.sync();
                yield fafactura_2.default.hasMany(faventa_2.default);
                yield fafactura_2.default.belongsTo(maempresa_2.default);
                yield fafactura_2.default.belongsTo(matienda_2.default);
                yield fafactura_2.default.belongsTo(macliente_2.default);
                yield fafactura_2.default.belongsTo(seusuario_2.default);
                yield faventa_2.default.sync();
                yield faventa_2.default.belongsTo(fafactura_2.default);
                // 
                yield maempresa_2.default.findOrCreate({
                    where: { xrif: "J-000202001" },
                    defaults: {
                        xrif: "J-000202001",
                        xshortname: "FARMATODO, C.A.",
                        xlongname: "FARMATODO, Compañia Anonima",
                        xaddress: "Av. Los Guayabitos, CC Expreso Baruta, Nivel 5, Of. Unica, Urb. La Trinidad (Sector Puerta Azul), Caracas."
                    }
                });
                yield matienda_2.default.findOrCreate({
                    where: { nstore: 2189 },
                    defaults: {
                        idempresa: 1,
                        xname: "FARMACIA OPALO",
                        nstore: 2189,
                        xtelf: "0800-FARMATODO",
                        xaddress: "CCS: Sabana Gnd. Casanova/Recreo. Ed. Rupi",
                    }
                });
                yield macliente_2.default.findOrCreate({
                    where: { xdni: 'V25221952' },
                    defaults: {
                        xdni: 'V25221952',
                        xbusinessname: "GABRIEL JOSE ESTACIO RIVAS",
                        xtelf: "04241829583",
                        xshortaddress: "Petare, Jose Felix Ribas",
                    }
                });
                yield serol_2.default.findOrCreate({
                    where: { id: '1' },
                    defaults: {
                        id: '1',
                        xrol: 'superadmin',
                    }
                });
                yield seusuario_2.default.findOrCreate({
                    where: { xusername: 'gestacio' },
                    defaults: {
                        xcodeemployee: 'X723H145',
                        xfirstname: 'Gabriel',
                        xlastname: "Estacio",
                        xusername: "gestacio",
                        xpassword: "N3wp4ssa..",
                        serolId: 1,
                    }
                });
                yield fafactura_2.default.findOrCreate({
                    where: { id: '1' },
                    defaults: {
                        ncaja: 6,
                        maempresaId: 1,
                        matiendaId: 1,
                        maclienteId: 1,
                        seusuarioId: 1,
                    }
                });
                yield faventa_2.default.findOrCreate({
                    where: { id: "1" },
                    defaults: {
                        xidproduct: "111920464",
                        xproduct: "FLIPS DULCE DE LECHE",
                        mprice: 44.74,
                        fafacturaId: 1,
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
