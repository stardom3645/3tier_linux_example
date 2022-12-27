var express = require('express');
var app = express();
var port = 3000;
var cors = require('cors');
var bodyParser = require('body-parser');
var router = require('./router/index');
var passport = require('passport');
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})