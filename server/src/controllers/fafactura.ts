import { Request, Response } from 'express';
import FaFactura from '../models/fafactura';
import MaEmpresa from '../models/maempresa';
import MaTienda from '../models/matienda';
import MaCliente from '../models/macliente';
import SeUsuario from '../models/seusuario';
import FaVenta from '../models/faventa';


export const postLoginFaFactura = async (req: Request, res: Response) => {
    const { body } = req;
    const fafactura = await FaFactura.findOne({ where: { xusername: body.xusername, xpassword: body.xpassword } })

    if (fafactura) {
        res.json(fafactura);
    } else {
        res.status(401).json({
            msg: `Credenciales inválidas, no existe el usuario: ${body.xusername}`
        });
    }

}

export const getFaFactura = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fafactura = await FaFactura.findByPk(id)

    if (fafactura) {
        res.json(fafactura);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

}

export const getFaFacturas = async (req: Request, res: Response) => {
    const listFaFacturas = await FaFactura.findAll({
        include: [
            {
                model: MaEmpresa
            },
            {
                model: MaTienda,
            },
            {
                model: MaCliente
            },
            {
                model: SeUsuario
            },
            {
                model: FaVenta
            }
        ]
    })

    res.json(listFaFacturas);
}

export const deleteFaFactura = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fafactura = await FaFactura.findByPk(id)

    if (fafactura) {
        await fafactura.destroy();
        res.json('el usuarioo fue eliminado con éxito');
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}

export const postFaFactura = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await FaFactura.create(body);
        res.json({
            msg: `El usuario fue agregado con exito!`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }

}

export const updateFaFactura = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const fafactura = await FaFactura.findByPk(id)

        if (fafactura) {
            await fafactura.update(body);
            res.json({
                msg: `El FaFactura fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `No existe un FaFactura con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}