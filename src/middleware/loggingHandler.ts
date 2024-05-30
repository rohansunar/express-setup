import { Request, Response, NextFunction } from 'express';

export function loggingHandler(req: Request, res: Response, next: NextFunction) {
    logging.info(`Incoming - METHOD:[${req.method}] - URL:[${req.url}] - IP:[${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.log(`Incomming - METHOD :[${req.method}] - URL:[${req.url}] - IP:[${req.socket.remoteAddress}] - STATUS:[${res.statusCode}]`);
    });
    next();
}
