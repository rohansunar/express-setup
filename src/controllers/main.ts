import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';

@Controller()
class MainController {
    @Route('get', '/')
    root(req: Request, res: Response, next: NextFunction) {
        logging.info('Root Route Called Successfully');
        return res.status(200).json({ hello: 'Root Route' });
    }
    @Route('get', '/healthcheck')
    @Route('post', '/healthcheck')
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        logging.info('Healthcheck Called Successfully');
        return res.status(200).json({ hello: 'World', ...req.body });
    }
}

export default MainController;
