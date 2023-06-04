import {Request, Response} from 'express';
import SeUsuario from '../models/seusuario';


export const postLoginSeUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const seusuario = await SeUsuario.findOne({where: {xusername: body.xusername, xpassword: body.xpassword}})

    if(seusuario) {
        res.json(seusuario);
    } else {
        res.status(401).json({
            msg: `Credenciales inválidas, no existe el usuario: ${body.xusername}`
        });
    }
    
}

export const getSeUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const seusuario = await SeUsuario.findByPk(id)

    if(seusuario) {
        res.json(seusuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
    
}

export const getSeUsuarios = async (req: Request, res: Response) => {
    const listSeUsuarios = await SeUsuario.findAll()

    res.json(listSeUsuarios);
}

export const deleteSeUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const seusuario = await SeUsuario.findByPk(id)
    
    if(seusuario) {
        await seusuario.destroy();
        res.json('el usuarioo fue eliminado con éxito');
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}

export const postSeUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    
    try {
        await SeUsuario.create(body);
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

export const updateSeUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    
    try {
        const seusuario = await SeUsuario.findByPk(id)

    if (seusuario) {
        await seusuario.update(body);
        res.json({
            msg: `El seusuario fue actualizado con éxito`
        })
    } else {
        res.status(404).json({
            msg: `No existe un seusuario con el id ${id}`
        });
    }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}