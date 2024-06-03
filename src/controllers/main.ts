// import { Request, Response, NextFunction } from 'express';
// import { Controller } from '../decorators/Controller';
// import { Route } from '../decorators/route';
// import Joi from 'joi';
// import { Validate } from '../decorators/validate';

// const postHealthCheckValidation = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required()
// });

// @Controller('/')
// class MainController {
//     @Route('get', '/')
//     root(req: Request, res: Response, next: NextFunction) {
//         logging.info('Root Route Called Successfully');
//         return res.status(200).json({ hello: 'Root Route' });
//     }
//     @Route('get', '/healthcheck')
//     getHealthCheck(req: Request, res: Response, next: NextFunction) {
//         logging.info('Healthcheck Called Successfully');
//         return res.status(200).json({ hello: 'World', ...req.body });
//     }
//     @Route('post', '/healthcheck')
//     @Validate(postHealthCheckValidation)
//     getHealthCheckPost(req: Request, res: Response, next: NextFunction) {
//         logging.info('Healthcheck Called Successfully');
//         return res.status(200).json({ ...req.body });
//     }
// }

// export default MainController;
