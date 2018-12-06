const request = require('supertest');

const server = require('./server');


describe('server', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
    });

    describe('/names route', () => {
        it('should return array of strings', async () => {
            let response = await request(server).get('/names');
            expect(response.status).toBe(200);
            expect(typeof response.data).toEqual('Array');
            expect(typeof response.data[0]).toEqual('String');
        });
    });

    describe('/names post route', () => {
        it('should return array of names', async () => {
            let response = await request(server).get('/names');
            expect(response.status).toBe(200);
        });
    });

    describe('/names delete route', () => {
        it('should return array of names', async () => {
            let response = await request(server).get('/names');
            expect(response.status).toBe(200);
        });
    });
});