import {Request, Response} from 'express';
import SeRol from '../models/serol';

export const getSeRolWhere = async (req: Request, res: Response) => {
    const { body } = req;
    const serol = await SeRol.findOne({where: {xrol: body.xrol}})

    if(serol) {
        res.json(serol);
    } else {
        res.status(401).json({
            msg: `Credenciales inválidas, no existe el rol: ${body.xrol}`
        });
    }
}

export const getSeRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const serol = await SeRol.findByPk(id)

    if(serol) {
        res.json(serol);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
    
}

export const getSeRoles = async (req: Request, res: Response) => {
    const listSeRols = await SeRol.findAll()

    res.json(listSeRols);
}

export const deleteSeRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const serol = await SeRol.findByPk(id)
    
    if(serol) {
        await serol.destroy();
        res.json('el usuarioo fue eliminado con éxito');
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}

export const postSeRol = async (req: Request, res: Response) => {
    const { body } = req;
    
    try {
        await SeRol.create(body);
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

export const updateSeRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    
    try {
        const serol = await SeRol.findByPk(id)

    if (serol) {
        await serol.update(body);
        res.json({
            msg: `El serol fue actualizado con éxito`
        })
    } else {
        res.status(404).json({
            msg: `No existe un serol con el id ${id}`
        });
    }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}