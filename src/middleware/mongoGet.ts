import { Request, Response, NextFunction } from 'express';
import mongooose, { Model } from 'mongoose';

export function mongoGet(model: Model<any>) {
    return async function name(req: Request, res: Response, next: NextFunction) {
        try {
            const document = await model.find();
            req.mongoGetAll = document;
        } catch (error) {
            logging.error(error);
            return res.status(500).json(error);
        }
        next();
    };
}
