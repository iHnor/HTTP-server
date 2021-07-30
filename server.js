import * as logic from './serverLogic.js'
import http from 'http'
import url from 'url'
import querystring from 'querystring'

const server = http.createServer((req, res) => {
    let adress = req.url;
    let readAdress = url.parse(adress, true);
    let getPathname = readAdress.pathname;

    if (req.url === '/headers') {
        const headers = req.headers;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(headers) + '\n');
    }

    else if (getPathname === '/plural') {
        let searchParam = readAdress.search;
        let number = querystring.parse(searchParam)['?number'];
        let form = querystring.parse(searchParam)['forms']

        if (number != undefined && form != undefined) {
            form = form.split(',')
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(logic.pluralization(number, form) + '\n');
        }
        else {
            res.writeHead(404, 'Not Found');
            res.end()
        }
    }
    else if (getPathname === '/frequency') {
        if (req.method === 'POST') {
            const getText = [];
            req.on('data', message => {
                getText.push(message);
            })

            req.on('end', () => {
                let fullText = getText.join('')
                let textFrequency = logic.wordFrequency(fullText);
                let createObjJSON = logic.objectJSON(textFrequency)

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Number-Of-Unique-Words', `${logic.uniqueWords(textFrequency)}`);
                res.setHeader('Number-Of-Frequent-Words', `${logic.frequentWords(textFrequency)}`);
                res.end(JSON.stringify(createObjJSON) + '\n')
            })
        }
        else {
            res.writeHead(404, 'Not Found');
            res.end()
        }
    }
    else {
        res.writeHead(404, 'Not Found');
        res.end()
    }
})

const port = 5000;
server.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
})