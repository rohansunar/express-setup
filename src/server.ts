import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import './config/logging';
import 'reflect-metadata';

import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandlers';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER, SERVER_HOSTNAME, SERVER_PORT, mongo } from './config/config';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/main';
import { declareHandler } from './middleware/declareHandler';
import BooksController from './controllers/books';

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logging.info('-------------------------------------');
    logging.info('Initializing API');
    logging.info('-------------------------------------');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    logging.info('-------------------------------------');
    logging.info('Connect to Mongo');
    logging.info('-------------------------------------');
    try {
        const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
        logging.log('-------------------------------------');
        logging.log('Connection to Mongo:', connection.mongo);
        logging.log('-------------------------------------');
    } catch (error) {
        logging.log('-------------------------------------');
        logging.log('Unable to Connect Mongo:');
        logging.error(error);
        logging.log('-------------------------------------');
    }
    logging.info('-------------------------------------');
    logging.info('Logging & Configuration');
    logging.info('-------------------------------------');
    app.use(declareHandler);
    app.use(loggingHandler);
    app.use(corsHandler);

    logging.info('-------------------------------------');
    logging.info('Define Controller Routing');
    logging.info('-------------------------------------');
    defineRoutes([MainController, BooksController], app);

    logging.info('-------------------------------------');
    logging.info('Define Controller Routing');
    logging.info('-------------------------------------');
    app.use(routeNotFound);

    logging.info('-------------------------------------');
    logging.info('Start Server');
    logging.info('-------------------------------------');
    httpServer = http.createServer(app);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info('-------------------------------------');
        logging.info(`Server Started ${SERVER_HOSTNAME} : ${SERVER_PORT}`);
        logging.info('-------------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);
Main();
