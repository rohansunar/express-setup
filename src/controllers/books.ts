import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/Controller';
import { Get } from '../decorators/Methods';
import { Route } from '../decorators/route';
import { Book } from '../models/Book';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoDelete } from '../decorators/mongoose/delete';
import { IRouteParams } from '../interfaces';

@Controller('/books')
class BooksController {
    static children: Array<IRouteParams> = [];
    @Get('/get/all')
    // @MongoGetAll(Book)
    getAll(req: Request, res: Response, next: NextFunction) {
        // return res.status(200).json(req.mongoGetAll);
        return res.status(200).json({});
    }
    // @Get('get', '/get/:id')
    // // @MongoGet(Book)
    // get(req: Request, res: Response, next: NextFunction) {
    //     return res.status(200).json(req.mongoGet);
    // }
    // @Post('post', '/create')
    // // @MongoCreate(Book)
    // create(req: Request, res: Response, next: NextFunction) {
    //     return res.status(201).json(req.mongoCreate);
    // }
    // @Post('post', '/query')
    // query(req: Request, res: Response, next: NextFunction) {
    //     return res.status(200).json(req.mongoQuery);
    // }
    // @Patch('patch', '/update/:id')
    // update(req: Request, res: Response, next: NextFunction) {
    //     return res.status(201).json(req.mongoUpdate);
    // }
    // @Delete('delete', '/delete/:id')
    // // @MongoDelete(Book)
    // delete(req: Request, res: Response, next: NextFunction) {
    //     return res.status(200).json({ message: 'Deleted' });
    // }
}

export default BooksController;
