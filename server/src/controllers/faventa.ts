import { Request, Response } from 'express';
import FaVenta from '../models/faventa';
import sequelize from '../db/connection';


export const getFaVentas = async (req: Request, res: Response) => {
    const listFaVentas = await FaVenta.findAll()

    res.json(listFaVentas);
}

export const postFaVentasWhere = async (req: Request, res: Response) => {
    const { body } = req;
    const listFaVentasWhere = await FaVenta.findAll({ where: { nticket: body.nticket } })

    res.json(listFaVentasWhere);
}

export const getFaVenta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const faventa = await FaVenta.findByPk(id)

    if (faventa) {
        res.json(faventa);
    } else {
        res.status(404).json({
            msg: `No existe una venta con el id ${id}`
        });
    }

}

export const deleteFaVenta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const faventa = await FaVenta.findByPk(id)

    if (faventa) {
        await faventa.destroy();
        res.json('el faventao fue eliminado con éxito');
    } else {
        res.status(404).json({
            msg: `No existe un faventao con el id ${id}`
        });
    }
}

export const postFaVenta = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await FaVenta.create(body);
        res.json({
            msg: `La venta fue agregada con exito!`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }

}

export const updateFaVenta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const faventa = await FaVenta.findByPk(id)

        if (faventa) {
            await faventa.update(body);
            res.json({
                msg: `El faventao fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `No existe un faventao con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}

export const sellFaVenta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const faventa = await FaVenta.findByPk(id)

        if (faventa) {
            await sequelize.query(`UPDATE mafaventaos SET stock = stock - 1 where id = ${id}`);
            res.json({
                msg: `El faventao fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `No existe un faventao con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}
