import { Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';


export const getViewLoginSessionData = async (req: Request, res: Response) => {
    const { nstore } = req.params;

    try {
        const viewLoginSessionData = await sequelize.query(
            `
            SELECT * FROM viewloginsessiondata WHERE nstore = ${nstore}
            `
        , { type: QueryTypes.SELECT })
        

        if (viewLoginSessionData) {
            res.json({
                "viewLoginSessionData": viewLoginSessionData[0]
            })
        } else {
            res.status(404).json({
                msg: `No existe viewLoginSessionData con el nstore ${nstore}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Upss ocurrió un error'
        });
    }
}
