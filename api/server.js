const express = require('express');

const server = express();

server.use(express.json());

let names = [
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

server.delete('/names', (req, res) => {
    if (!req.body.index) {
        res.status(400).json({error: 'index must be provided'})
        return;
    }
    if (names.length <= req.body.index) {
        res.status(404).json({error: 'name does not exist'})
        return;
    }

    let copy = [...names];
    copy.slice(req.body.index, 1);
    names = copy;
    
    res.status(200).json({deleted: 'name'});
})

module.exports = server;