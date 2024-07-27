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
const url = require('url');


const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;

}

const overviewTemp = fs.readFileSync(`${__dirname}/templates/temp-overview.html`, 'utf-8');
const cardTemp = fs.readFileSync(`${__dirname}/templates/temp-card.html`, 'utf-8');
const productTemp = fs.readFileSync(`${__dirname}/templates/temp-product.html`, 'utf-8');

let temp = overviewTemp.replace('')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);


const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url,true);
    // Overview Page
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead('200', { 'Content-type': 'text/html' });
        const cardHtml = productData.map(element => replaceTemplate(cardTemp, element));
        const overviewHtml = overviewTemp.replace(/{%PRODUCTCARD%}/g,cardHtml)
        res.end(overviewHtml);
    }
    // API Page

    else if (pathname === '/api') {
        res.end(data);
    }
    // Product Page

    else if (pathname === '/product') {
        res.writeHead('200', { 'Content-type': 'text/html' });
        const product = productData[query.id];
        const output = replaceTemplate(productTemp,product);

        res.end(output);
    }
    // Not Found Page

    else {
        res.end('<h1> Page Not Found </h1>')
    }

});
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});