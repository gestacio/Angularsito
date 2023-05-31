import {Request, Response} from 'express';
import MaTienda from '../models/matienda';


export const getMaTienda = async (req: Request, res: Response) => {
    const { nstore } = req.params;
    const matienda = await MaTienda.findOne({ where: { nstore: nstore } })

    if (matienda) {
        res.json(matienda);
    } else {
        res.status(404).json({
            msg: `No se encontró la empresa`
        });        
    }
}

export const getMaTiendas = async (req: Request, res: Response) => {
    const matienda = await MaTienda.findAll()

    res.json(matienda);
}

export const createMaTienda = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await MaTienda.findOrCreate(body);
        res.json({
            msg: `La empresa fue agregada con exito!`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }

}

export const updateMaTienda = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    
    try {
        const matienda = await MaTienda.findByPk(id)

    if (matienda) {
        await matienda.update(body);
        res.json({
            msg: `El matienda fue actualizado con éxito`
        })
    } else {
        res.status(404).json({
            msg: `No existe un matienda con el id ${id}`
        });
    }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}