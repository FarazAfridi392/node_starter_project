const fs = require('fs');

// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textout = `This is what we know about avaocado: ${textIn} \n Created at ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textout);

fs.readFile('./txt/input.txt',(err,data)=>{
    console.log(`This is a data:   ${data}`);
})