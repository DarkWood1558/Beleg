const express = require('express');
const path = require("path");
const portnumber = 4009;
const server = express();
const fs = require("fs");
var url = require('url')


server.use(express.static("public_html"));

server.get('/random.html', sendRandom);

server.get('/suchen', suchen);

function suchen(req, res) {

    let parsedUrl = url.parse(req.url,true);

    console.log(`${req.url} requested`);
    res.send(`Ihr Inhalt war ${parsedUrl.query["inhalt"]}`);
}


function sendRandom(req, res) {
    console.log('/random.html requested');
    let x = Math.random();
    let answer = 
    `
<html>
<body>    
    <h2>this is a random number: <code>${x}</code></h2>
</body>
</html>`;
    res.send(answer);
}




server.listen(portnumber, function ()  {
    console.log('listening at port ' + portnumber);
});