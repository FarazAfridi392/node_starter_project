//////////////////////////////////////////////////////////
////// Files

// const fs = require('fs');

// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textout = `This is what we know about avaocado: ${textIn} \n Created at ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textout);

// fs.readFile('./txt/input.txt',(err,data)=>{
//     console.log(`This is a data:  ${data}`);
// })

//////////////////////////////////////////////////////////
////// Server

const fs = require('fs');
const http = require('http');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (req.url === '/overview' || req.url === '/') {
        res.end('<h1> Overview </h1>')
    }
    else if (req.url === '/api') {
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            res.writeHead('200', { 'Content-type': 'application/json' });
            res.end(data);

        });

    }
    else if (req.url === '/product') {
        res.end('<h1> Product </h1>')
    }
    else {
        res.end('<h1> Page Not Found </h1>')
    }

});
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});