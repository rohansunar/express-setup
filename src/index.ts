import { Server } from './server';
import { Application } from 'express';

// Load controllers
import './controllers/books';

export default function app(): Application {
    // Express Setup
    return Server.create();
}

app();
