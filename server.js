const http = require('http');

const server = http.createServer((require, response) => {
    if (require.url === '/headers'){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Test server');
    }
    else {
        response.writeHead(400, 'Not Found');
        response.end()
    }
})

const port = 5555;
server.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
})