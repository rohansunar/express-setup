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
// import MainController from './controllers/main';
import { declareHandler } from './middleware/declareHandler';
import BooksController from './controllers/books';
import { AppRouter } from './AppRouter';

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

        logging.info('-------------------------------------');
        logging.info('Define Controller Routing');
        logging.info('-------------------------------------');
        app.use(routeNotFound);
    }

    /**
     * Static method to create server
     */
    public static create() {
        const server = new Server();
        server.setEssentialMiddlewares();
        server.mountRouter();
        server._databaseConnect();
        server.runServer();
    }

    mountRouter() {
        logging.info('-------------------------------------');
        logging.info('Define Controller Routing');
        logging.info('-------------------------------------');
        AppRouter.forEach((item) => {
            /// this equal to
            /// app.use('/users', requires('./users.routes.js'));
            /// where ./users.routes.js declares all sub-route for /users
            this.app.use(item.baseURL, item.routerObject);
        });
    }

    async _databaseConnect() {
        logging.info('-------------------------------------');
        logging.info('Connect to Mongo');
        logging.info('-------------------------------------');
        try {
            const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
            logging.log('-------------------------------------');
            logging.log('Connection to Mongo:');
            logging.log('-------------------------------------');
        } catch (error) {
            logging.log('-------------------------------------');
            logging.log('Unable to Connect Mongo:');
            logging.error(error);
            logging.log('-------------------------------------');
        }
    }

    runServer() {
        httpServer = http.createServer(this.app);
        httpServer.listen(SERVER.SERVER_PORT, () => {});
        httpServer.on('error', function (err) {
            console.log(err);
            process.exit(1);
        });
        httpServer.on('Listening', () => {
            logging.info('-------------------------------------');
            logging.info(`Server Started ${SERVER_HOSTNAME} : ${SERVER_PORT}`);
            logging.info('-------------------------------------');
        });
    }

    static disconnectServer() {
        return (callback: any) => httpServer && httpServer.close(callback);
    }
}
