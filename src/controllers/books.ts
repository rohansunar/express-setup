import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { Book } from '../models/Book';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoDelete } from '../decorators/mongoose/delete';

@Controller('/books')
class BooksController {
    @Route('get', '/get/all')
    @MongoGetAll(Book)
    getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }
    @Route('get', '/get/:id')
    @MongoGet(Book)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(Book)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(Book)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default BooksController;
