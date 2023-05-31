import express, {Application, Request, Response} from 'express';
import routesProducto from '../routes/producto';
import routesSeUsuario from '../routes/seusuario';
import routesMaEmpresa from '../routes/maempresa';
import db from '../db/connection';
import cors from 'cors';
// import sequelize from '../db/connection';
import SeUsuario from './seusuario';
import Producto from './producto';
import MaEmpresa from './maempresa';


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
        this.app.use('/api/maempresa', routesMaEmpresa)
        this.app.use('/api/productos', routesProducto)
        this.app.use('/api/seusuario', routesSeUsuario)
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
            await SeUsuario.sync();
            await Producto.sync();
            await MaEmpresa.findOrCreate({
                where: {xrif: "J-000202001"},
                defaults: {
                    xrif: "J-000202001",
                    xshortname: "FARMATODO, C.A.",
                    xlongname: "FARMATODO, Compañia Anonima",
                    xaddress: "Av. Los Guayabitos, CC Expreso Baruta, Nivel 5, Of. Unica, Urb. La Trinidad (Sector Puerta Azul), Caracas."
                }
            })                
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