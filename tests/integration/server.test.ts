import supertest from 'supertest';
import app from '../../src/index';
import { Server } from '../../src/server';

const request = supertest(app());

describe('Our Application ', () => {
    afterAll((done) => {
        Server.disconnectServer(done);
    });

    it('Starts and has the proper test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(app).toBeDefined();
    }, 10000);

    it('should get response 200 with success message', (done) => {
        request
            .get(`/books/get/all`)
            .expect(200)
            .end(function (err, res) {
                expect(err).toBeNull;
                expect(res.body.hello).toBe('Drivio');
                done();
            });
    });

    // it('Returns all Options allowed to be called by Customer (Http Methods)', async () => {
    //     const response = await request(app).options('/');
    //     expect(response.status).toBe(200);
    //     expect(response.headers['access-control-allow-methods']).toBe('PUT, POST, PATCH, DELETE, GET');
    // }, 10000);
});
