const express = require('express');

const server = express();

server.use(express.json());

const names = [
    'Name 1',
    'Name 2',
    'Name 3',
    'Name 4',
    'Name 5',
    'Name 6',
    'Name 7',
];

server.get('/', (req, res) => {
    res.status(200).json({server: 'is up'})
})

server.get('/names', (req, res) => {
    res.status(200).json(names);
})

server.post('/names', (req, res) => {
    if (!req.body.name) {
        res.status(400).json({error: 'name must be provided'})
        return;
    }
    names.push(req.body.name);
    const index = names.length - 1;
    res.status(201).json({index});
})

module.exports = server;