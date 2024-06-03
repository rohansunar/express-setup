import http from 'http';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import './config/logging';
import 'reflect-metadata';

import { IServerConfiguration } from './interfaces';
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

export class Server {
    app: express.Express;

    constructor() {
        this.app = express();
    }

    setEssentialMiddlewares(): void {
        logging.info('-------------------------------------');
        logging.info('Initializing API');
        logging.info('-------------------------------------');
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        logging.info('-------------------------------------');
        logging.info('Logging & Configuration');
        logging.info('-------------------------------------');
        app.use(declareHandler);
        app.use(loggingHandler);
        app.use(corsHandler);
    }

    /**
     * Static method to create server
     */
    public static create() {
        const server = new Server();
        server.setEssentialMiddlewares();
        server.mountRouter();
        server._databaseConnect();
        server.runServer(server.app);
    }

    mountRouter() {
        logging.info('-------------------------------------');
        logging.info('Define Controller Routing');
        logging.info('-------------------------------------');
        defineRoutes([MainController, BooksController], this.app);
    }

    async _databaseConnect() {
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
    }

    runServer(app: Application) {
        httpServer = http.createServer(app);
        httpServer.listen(SERVER.SERVER_PORT, () => {
            logging.info('-------------------------------------');
            logging.info(`Server Started ${SERVER_HOSTNAME} : ${SERVER_PORT}`);
            logging.info('-------------------------------------');
        });
    }

    static disconnectServer() {
        return (callback: any) => httpServer && httpServer.close(callback);
    }
}
