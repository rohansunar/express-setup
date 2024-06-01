import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';

export function MongoDelete(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const document = model.findByIdAndDelete({ _id: req.params.id });
                if (!document) {
                    return res.status(404).json({ message: 'Not Found' });
                }
            } catch (error) {
                logging.error(error);
                return res.status(500).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
