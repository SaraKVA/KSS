const express = require('express');
const path = require('path');
const fs = require('fs');
var https = require('https');
var influent = require('influent');
const app = express();

//Set static folder //needed for css
app.use(express.static(path.join(__dirname, 'public')));
//set view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    //res.writeHead(200);
    console.log('index page has been entered ...');
    res.render('index');
    //res.sendFile(path.join(__dirname, '/public' , 'index.html'));
     // res.send('Hello World!!');
 });
 /*
 app.get('/api/courses', (req, res) => {
     res.send([1,2,3]);
 });
 */


const port = process.env.PORT || 8000;
//just http (firefox auf android)
app.listen(8000, () => {console.log(`listening on port ${port} ...`)});
//https (chrome)
// var privateKey  = fs.readFileSync('keys/server.key', 'utf8');
// var certificate = fs.readFileSync('keys/server.cert', 'utf8');
// var credentials = {key: privateKey, cert: certificate};
// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(port);
console.log(`listening on port ${port} ...`);
// https.createServer({
//     key: fs.readFileSync('keys/server.key'),
//     cert: fs.readFileSync('keys/server.cert')
// }, app).listen(3000, () =>{
//     console.log(`listening on port ${port} ...`);
// })
