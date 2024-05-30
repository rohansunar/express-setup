import request from 'supertest';
import { app, Shutdown } from '../../src/server';

describe('Our Application ', () => {
    afterAll((done) => {
        Shutdown(done);
    });

    it('Starts and has the proper test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(app).toBeDefined();
    }, 10000);

    it('Returns all Options allowed to be called by Customer (Http Methods)', async () => {
        const response = await request(app).options('/');
        expect(response.status).toBe(200);
        expect(response.headers['access-control-allow-methods']).toBe('PUT, POST, PATCH, DELETE, GET');
    }, 10000);
});
