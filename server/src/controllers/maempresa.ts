import {Request, Response} from 'express';
import MaEmpresa from '../models/maempresa';


export const getMaEmpresa = async (req: Request, res: Response) => {
    const maempresa = await MaEmpresa.findOne()

    if (maempresa) {
        res.json(maempresa);
    } else {
        res.status(404).json({
            msg: `No se encontró la empresa`
        });        
    }
}

export const createMaEmpresa = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await MaEmpresa.findOrCreate(body);
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

export const updateMaEmpresa = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    
    try {
        const maempresa = await MaEmpresa.findByPk(id)

    if (maempresa) {
        await maempresa.update(body);
        res.json({
            msg: `El maempresa fue actualizado con éxito`
        })
    } else {
        res.status(404).json({
            msg: `No existe un maempresa con el id ${id}`
        });
    }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}