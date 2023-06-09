import { Request, Response } from 'express';
import FaFactura from '../models/fafactura';
import MaEmpresa from '../models/maempresa';
import MaTienda from '../models/matienda';
import MaCliente from '../models/macliente';
import SeUsuario from '../models/seusuario';
import FaVenta from '../models/faventa';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';


export const getFaFactura = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fafactura = await FaFactura.findByPk(id, {
        include: [
            {
                model: MaEmpresa,
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
    });

    if (fafactura) {
        res.json(fafactura);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

}

export const generateFaFactura = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fafactura = await FaFactura.findByPk(id, {
        attributes: {
            exclude: [
                'maempresaId',
                'matiendaId',
                'maclienteId',
                'seusuarioId',
                'updatedAt',
            ]
        },
        include: [
            {
                model: MaEmpresa,
                attributes: {
                    exclude: [
                        'id',
                        'xlongname',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            },
            {
                model: MaTienda,
                attributes: {
                    exclude: [
                        'id',
                        'idempresa',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            },
            {
                model: MaCliente,
                attributes: {
                    exclude: [
                        'id',
                        'xtelf',
                        'xshortaddress',
                        'xlongaddress',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            },
            {
                model: SeUsuario,
                attributes: {
                    exclude: [
                        'id',
                        'xcodeemployee',
                        'xusername',
                        'xpassword',
                        'serolId',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            },
            {
                model: FaVenta,
                attributes: {
                    exclude: [
                        'fafacturaId',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            }
        ]
    });

    if (fafactura) {
        res.json(fafactura);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

}

export const getFaFacturas = async (req: Request, res: Response) => {

    try {
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
    
        
        if (listFaFacturas) {
            res.json(listFaFacturas);
        } else {
            res.status(404).json({
                msg: `problemillas`,
            });
        }
    } catch (error) {
        console.log(error);
    }
    
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

// export const postFaFactura = async (req: Request, res: Response) => {
//     const { body } = req;

//     try {
//         await FaFactura.create(body);
//         res.json({
//             msg: `El usuario fue agregado con exito!`
//         });
//     } catch (error) {
//         console.log(error);
//         res.json({
//             msg: 'Upss ocurrió un error'
//         });
//     }

// }

export const postFaFactura = async (req: Request, res: Response) => {
    const { body } = req;
    const ncaja = body.ncaja;
    const mneto = body.mneto;
    const miva = body.miva;
    const mtotal = body.mtotal;
    const maempresaId = body.maempresaId;
    const matiendaId = body.matiendaId;
    const maclienteId = body.maclienteId;
    const seusuarioId = body.seusuarioId;



    try {
        const responseInsert = await sequelize.query(
            `INSERT INTO fafacturas (ncaja, mneto, miva, mtotal, maempresaId, matiendaId, maclienteId, seusuarioId)
            VALUES (${ncaja}, ${mneto}, ${miva}, ${mtotal}, ${maempresaId}, ${matiendaId}, ${maclienteId}, ${seusuarioId});
            
            SELECT id FROM fafacturas WHERE id = SCOPE_IDENTITY();
            `

        );
        // # SELECT SCOPE_IDENTITY();

        const id = responseInsert[0][0];



        res.json({
            msg: `La factura ha sido ingresada`,
            id: id,
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error',
            error: error,
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

export const getCountFaFacturas = async (req: Request, res: Response) => {
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()

    try {
        const countAllFaFacturas = await FaFactura.count();
        const countThisMonthFaFacturas = await sequelize.query(
            `
            --SELECT count(*) as value, '' as name FROM fafacturas 
            --LEFT JOIN matiendas on fafacturas.matiendaId = matiendas.id
            --WHERE MONTH(fafacturas.createdAt) = ${month} and YEAR(fafacturas.createdAt) = ${year}
            select count(id) as value, 'Opalo' as name from fafacturas 
            where MONTH(createdAt) = ${month} and YEAR(createdAt) = ${year} and matiendaId = 1
            `
        , { type: QueryTypes.SELECT })
        // const countFaFacturas = await FaFactura.findAll({
        //     attributes: {
        //         include: [
        //             [sequelize.literal(`

        //             `),
        //                 'ThisMonth'
        //             ]
        //         ]
        //     }
        // })

        if (countAllFaFacturas && countThisMonthFaFacturas) {
            res.json({
                "countAllFaFacturas": countAllFaFacturas,
                "countThisMonthFaFacturas": countThisMonthFaFacturas[0]
            })
        } else {
            res.status(404).json({
                msg: `No existen facturas en BDD`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}

export const getCountMonthsFaFacturas = async (req: Request, res: Response) => {
    const year = new Date().getFullYear()

    try {
        const series = await sequelize.query(
            `
            SET language 'Español'
            SELECT    COUNT(*) as value, 
            DATENAME(MONTH, MAX(createdAt)) as name
            FROM      fafacturas
            WHERE     YEAR(createdAt) = ${year}
            and matiendaId = 1
            GROUP BY  MONTH(createdAt), YEAR(createdAt)
            ORDER BY YEAR(createdAt), MONTH(createdAt)
            `
        , )

        if (series) {
            res.json({
                "name": "Opalo",
                "series": series[0]
            })
        } else {
            res.status(404).json({
                msg: `No existen facturas en BDD`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}

export const getCountMonthStoresFaFacturas = async (req: Request, res: Response) => {
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()

    try {
        const ventaMesActualPorTienda = await sequelize.query(
            `
            select count(fafacturas.id) as value, matiendas.xname as name from fafacturas 
            INNER JOIN matiendas on fafacturas.matiendaId = matiendas.id
            where MONTH(fafacturas.createdAt) = ${month} and YEAR(fafacturas.createdAt) = ${year}
            group by matiendas.xname
            order by count(fafacturas.id) DESC
            `
        , {type: QueryTypes.SELECT})

        if (ventaMesActualPorTienda) {
            res.json(ventaMesActualPorTienda)
        } else {
            res.status(404).json({
                msg: `No existen facturas en BDD`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}
