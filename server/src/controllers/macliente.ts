import { Request, Response } from 'express';
import sequelize from '../db/connection';
import MaCliente from '../models/macliente';



export const getMaCliente = async (req: Request, res: Response) => {
    const { xdni } = req.params;
    const macliente = await MaCliente.findOne({ where: { xdni: xdni } })

    if (macliente) {
        res.json(macliente);
    } else {
        res.json({
            xdni: '',
            xbusinessname: '',
            xtelf: '',
            xshortaddress: '',
            xlongaddress: '',
        });
    }

}
export const getMaClientes = async (req: Request, res: Response) => {
    const listMaCliente = await MaCliente.findAll()

    res.json(listMaCliente);
}

export const deleteMaCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const macliente = await MaCliente.findByPk(id)

    if (macliente) {
        await macliente.destroy();
        res.json('el macliente fue eliminado con éxito');
    } else {
        res.status(404).json({
            msg: `No existe un macliente con el id ${id}`
        });
    }
}

export const postMaCliente = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await MaCliente.create(body);
        res.json({
            msg: `El macliente fue agregado con exito!`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }

}

export const updateMaCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const macliente = await MaCliente.findByPk(id)

        if (macliente) {
            await macliente.update(body);
            res.json({
                msg: `El macliente fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `No existe un macliente con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}

export const sellMaCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const macliente = await MaCliente.findByPk(id)

        if (macliente) {
            await sequelize.query(`UPDATE mamaclientes SET stock = stock - 1 where id = ${id}`);
            res.json({
                msg: `El macliente fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `No existe un macliente con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}
