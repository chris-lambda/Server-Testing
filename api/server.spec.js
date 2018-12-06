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

    describe('/names get route', () => {
        it('returns status 200', async () => {
            let response = await request(server).get('/names');
            expect(response.status).toBe(200);
        });
        
        it('should return array of strings', async () => {
            let response = await request(server).get('/names');
            expect(typeof response.body[0]).toEqual('string');
        });
    });

    describe('/names post route', () => {
        it('should return index of new name', async () => {
            const name = "new name"
            let response = await request(server).post('/names').send({name});
            const index = response.body.index;
            
            expect(response.status).toBe(201);
            expect(typeof index).toEqual('number');

        });

        it('index returned mathes index in db', async () => {
            const name = "new name"
            let response = await request(server).post('/names').send({name});
            
            expect(response.status).toBe(201);

            const index = response.body.index;
            response = await request(server).get('/names')
            const names = response.body;

            expect(names[index]).toEqual(name);
        });

        it('should respond with status code 400 if name is not provided', async () => {
            let response = await request(server).post('/names').send({});
            expect(response.status).toBe(400);
        });

    });

    describe('/names delete route', () => {
        it('returns status 200 when delete is succesful', async () => {
            
            let response = await request(server).get('/names');

            const length = response.body.length;
            
            response = await request(server).delete('/names').send({index: length-1});

            expect(response.status).toEqual(200)
        });
        
        it('should return 404 if index cant be found', async () => {
            let response = await request(server).get('/names');

            const length = response.body.length;
            
            response = await request(server).delete('/names').send({index: length+1});

            expect(response.status).toEqual(404);
        });

        it('should return 400 if index is not provided', () => {
            response = await request(server).delete('/names').send({});

            expect(response.status).toEqual(400);
        });

        // return 200 on succesful delete
        // return 404 if index is not found
        // return 400 if index is not procided
    });
});