let express = require('express');
let request = require('request');

let app = express();
app.use('/', function(req, res) {
    console.log("req:  ",req);
    let url = "http://localhost:8080" + req.url;
    req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);