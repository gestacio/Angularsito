import { Request, Response } from 'express';
import Producto from '../models/producto';
import { Op, QueryTypes } from 'sequelize';
import sequelize from '../db/connection';


export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Producto.findAll()

    res.json(listProducts);
}

export const postProductsWhere = async (req: Request, res: Response) => {
    console.log("******** holita *******")
    const { body } = req;
    console.log(body);
    const listProductsWhere = await Producto.findAll({ where: { name: body.name } })

    res.json(listProductsWhere);
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id)

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }

}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id)

    if (product) {
        await product.destroy();
        res.json('el producto fue eliminado con éxito');
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Producto.create(body);
        res.json({
            msg: `El producto fue agregado con exito!`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }

}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const product = await Producto.findByPk(id)

        if (product) {
            await product.update(body);
            res.json({
                msg: `El producto fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}

export const sellProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const product = await Producto.findByPk(id)

        if (product) {
            await sequelize.query(`UPDATE maproductos SET stock = stock - 1 where id = ${id}`);
            res.json({
                msg: `El producto fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}
