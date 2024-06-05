import { Request, Response, NextFunction } from 'express';
import { Controller, Get, Post, Patch, Delete, Middleware } from '../decorators';
import { Route } from '../decorators/route';
import { Book } from '../models/Book';
import { MongoGetAll, MongoGet, MongoCreate, MongoDelete } from '../decorators/mongoose';
import { IRouteParams } from '../interfaces';

@Controller('/books')
class BooksController {
    static children: Array<IRouteParams> = [];
    @Middleware(function (req, res, next) {
        res.locals.hello = 'Drivio';
        next();
    })
    @Get('/get/all')
    // @MongoGetAll(Book)
    getAll(req: Request, res: Response, next: NextFunction) {
        // return res.status(200).json(req.mongoGetAll);
        return res.status(200).json({ name: res.locals.hello });
    }
    @Get('/get/:id')
    // @MongoGet(Book)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }

    @Post('/create')
    // @MongoCreate(Book)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Post('/query')
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoQuery);
    }
    @Patch('/update/:id')
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }
    @Delete('/delete/:id')
    // @MongoDelete(Book)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default BooksController;
