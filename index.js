var http = require('http');
var fs = require('fs');
var path = require('path');

const port = 5000

http.createServer((request, response) => {
    // response.end("welcome in node js")
    var contentType = 'text/html';
    var filePath = '.' + request.url;
    // console.log(filePath);
    if (filePath == './') {
        filePath = './index.html';
    }
   else if (filePath == './about') {
        filePath = './about.html';
    }
    else if (filePath == './service') {
        filePath = './service.html';
    }
    else if (filePath == './why') {
        filePath = './why.html';
    }
    else if (filePath == './team') {
        filePath = './team.html';
    }

    var extname = path.extname(filePath);
    // console.log(extname);

    switch(extname){

        case '.js':
            contentType = 'text/javascript';
            break;
    
        case '.css':
            contentType = 'text/css';
            break;
    
        case '.html':
            contentType = 'text/html';
            break;
    
        case '.jpg':
            contentType = 'image/jpg';
            break;
    
        case '.png':
            contentType = 'image/png';
            break;   
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            fs.readFile("404.html", (er, da) => {
                er ? console.log(er) : response.end(da)
            })
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data)
        }
    })
})
    .listen(port, () => {
        console.log('app running on port' + port);
        console.log('http://localhost:' + port);
    })