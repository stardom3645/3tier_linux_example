var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var board = require('./board/index');
var signUp = require('./signUp/index')
var login = require('./login/index');
var cookieParser = require('cookie-parser');

var os = require("os");
var hostName = os.hostname();

//url root
router.get('/', function(req,res){
    if (req.cookies.user){
        res.render('main.ejs', 
        {cookie : req.cookies.user,
        hostName: hostName
        });
    }
    else{
        res.render('main.ejs', 
        {   cookie: "false",
            hostName: hostName
        });
    }
    
});

router.get('/logout', function (req, res) {
    res.clearCookie("user");	
	res.redirect("/");
});


router.use(cookieParser());
router.use('/board', board);
router.use('/signUp', signUp);
router.use('/login', login);

module.exports = router;


