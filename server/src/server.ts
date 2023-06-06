import express, { Application, Request, Response } from 'express';
import routesProducto from './routes/producto';
import routesSeUsuario from './routes/seusuario';
import routesMaEmpresa from './routes/maempresa';
import routesMaTienda from './routes/matienda';
import routesMaCliente from './routes/macliente';
import routesSeRol from './routes/serol';
import routesFaVenta from './routes/faventa';
import routesFaFactura from './routes/fafactura';
import db from './db/connection';
import cors from 'cors';
// import sequelize from '../db/connection';
import SeUsuario from './models/seusuario';
import Producto from './models/producto';
import MaEmpresa from './models/maempresa';
import MaTienda from './models/matienda';
import MaCliente from './models/macliente';
import SeRol from './models/serol';
import FaVenta from './models/faventa';
import FaFactura from './models/fafactura';


class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/maclientes', routesMaCliente)
        this.app.use('/api/maempresas', routesMaEmpresa)
        this.app.use('/api/matiendas', routesMaTienda)
        this.app.use('/api/productos', routesProducto)
        this.app.use('/api/seroles', routesSeRol)
        this.app.use('/api/seusuarios', routesSeUsuario)
        this.app.use('/api/faventas', routesFaVenta)
        this.app.use('/api/fafacturas', routesFaFactura)
    }

    midlewares() {
        // Parseamos el body
        this.app.use(express.json())

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('base de datos conectada');
            // await sequelize.sync({ force: true });
            await MaEmpresa.sync();
            await MaEmpresa.hasMany(FaFactura);

            await MaTienda.sync();
            await MaTienda.hasMany(FaFactura);

            await MaCliente.sync();
            await MaCliente.hasMany(FaFactura);

            await SeRol.sync();
            await SeRol.hasMany(SeUsuario);

            await SeUsuario.sync();
            await SeUsuario.hasMany(FaFactura);
            await SeUsuario.belongsTo(SeRol);
            
            await Producto.sync();

            await FaFactura.sync();
            await FaFactura.hasMany(FaVenta);
            await FaFactura.belongsTo(MaEmpresa);
            await FaFactura.belongsTo(MaTienda);
            await FaFactura.belongsTo(MaCliente);
            await FaFactura.belongsTo(SeUsuario);

            await FaVenta.sync();
            await FaVenta.belongsTo(FaFactura);

            // 
            await MaEmpresa.findOrCreate({
                where: { xrif: "J-000202001" },
                defaults: {
                    xrif: "J-000202001",
                    xshortname: "FARMATODO, C.A.",
                    xlongname: "FARMATODO, Compañia Anonima",
                    xaddress: "Av. Los Guayabitos, CC Expreso Baruta, Nivel 5, Of. Unica, Urb. La Trinidad (Sector Puerta Azul), Caracas."
                }
            });
            await MaTienda.findOrCreate({
                where: { nstore: 2189 },
                defaults: {
                    idempresa: 1,
                    xname: "FARMACIA OPALO",
                    nstore: 2189,
                    xtelf: "0800-FARMATODO",
                    xaddress: "CCS: Sabana Gnd. Casanova/Recreo. Ed. Rupi",
                }
            });
            await MaCliente.findOrCreate({
                where: { xdni: 'V25221952' },
                defaults: {
                    xdni: 'V25221952',
                    xbusinessname: "GABRIEL JOSE ESTACIO RIVAS",
                    xtelf: "04241829583",
                    xshortaddress: "Petare, Jose Felix Ribas",
                }
            });
            await SeRol.findOrCreate({
                where: { id: '1' },
                defaults: {
                    id: '1',
                    xrol: 'superadmin',
                }
            });
            await SeUsuario.findOrCreate({
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
            await FaFactura.findOrCreate({
                where: { id: '1' },
                defaults: {
                    ncaja: 6,
                    mneto: 20,
                    niva: 16,
                    mtotal: 22,
                    maempresaId: 1,
                    matiendaId: 1,
                    maclienteId: 1,
                    seusuarioId: 1,
                }
            });
            await FaVenta.findOrCreate({
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

        } catch (error) {
            console.log(error);
            console.log('Error - Ejecución con base de datos');
        }
    }

}

export default Server;