// const logic = require('./serverLogic')
// import * as logic from './serverLogic.js'

const http = require('http');
const url = require('url');
const queryString = require('querystring');

function pluralization(numberOfOld, words) {

    let sNumb = numberOfOld % 10
    let dNumb = numberOfOld % 100

    if ((10 <= dNumb && dNumb <= 20) || (sNumb == 0) || (5 <= sNumb && sNumb <= 20))
        return `${numberOfOld} ${words[1]}`;
    else if (numberOfOld == 1)
        return `${numberOfOld} ${words[0]}`;
    else
        return `${numberOfOld} ${words[2]}`;
};

function wordFrequency (text){
    let words = text.replace(/[.,!?]/g,'').toLowerCase().split(' ');
    let map = new Map();

    for (let i = 0; i < words.length; i++){ 
        let word = words[i];
        
        if (map.has(word)) {
            let count = map.get(word)
            map.set(word, count + 1);
        }
        else {
            map.set(word, 1);
         
        }
    }
    return map;
};

function objectJSON(mapFrequency){
    let objJSON = {}
    mapFrequency.forEach((value, key) =>{
        objJSON[key] = value;
    })
    return objJSON;
}

function uniqueWords(mapFrequency){
    let objJSON = {}
    mapFrequency.forEach((value, key) =>{
        if (key === 1)
            objJSON[key] = value;
    })
    return objJSON; 
}

const server = http.createServer((req, res) => {
    let adress = req.url;
    let readAdress = url.parse(adress, true);
    let getPathname = readAdress.pathname;

    if (req.url === '/headers'){
        const headers = req.headers;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(headers) + '\n');
    }
    else if (getPathname === '/plural') {
        let searchParam = readAdress.search;
        
        let number = queryString.parse(searchParam)['?number'];
        let form = queryString.parse(searchParam)['forms']
        if (number != undefined && form != undefined){
            form = form.split(',')
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(pluralization(number, form) + '\n');
        }
        else {
            res.writeHead(404, 'Not Found');
            res.end()   
        }
        
    }
    else if (getPathname === '/frequency'){
        if (req.method === 'POST') {
            const getText = [];
            req.on('data', message => {
                getText.push(message);
            })

            req.on('end', () => {
                let fullText = getText.join('')
                textFrequency = wordFrequency(fullText);
                let createObjJSON = objectJSON(textFrequency)

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Number-Of-Unique-Words', `${uniqueWords(textFrequency)}`);

                res.end(JSON.stringify(createObjJSON))
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