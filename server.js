const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

//api for interacting with mongoDB
const api = require('./routes/api');

//port for app
const port = 3000;

// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('port',port);
//Angular dist output folder
//app.use(express.static(path.join(__dirname,'dist')));

//API location
app.use('/api',api);

//send all requests to Angular app
app.get('*',(req,res)=>{
    //res.sendFile(path.join(__dirname,'dist/index.html'));
    res.send("Hello People");
});

const server = http.createServer(app);
server.listen(port, ()=> console.log(`Running on localhost: ${port}`));