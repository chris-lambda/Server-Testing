const express = require('express');

const server = express();


const port = 9001 || process.env.PORT;

server.listen(port, () => console.log(`\nServer up on PORT: ${port}\n`) )
