var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
var crypto = require('crypto');
const salt = crypto.randomBytes(128).toString('base64');

// DATABASE setting
var connection = mysql.createPool({
	host: '10.10.1.80',
	user: 'root',
	password: 'Ablecloud1!',
	port: '3306',
	database: 'galeradb'
});

// connection.connect();


router.get('/', function (req, res) {
    if (req.cookies.user){
        res.render('signUp.ejs', {cookie : req.cookies.user});
    }
    else{
        res.render('signUp.ejs', {cookie: "false"});
    }
})

router.post('/', async function (req, res, next) {
	var id = req.body.id;
	var email = req.body.email;
	var password = req.body.pw;

	const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');
	var query = "SELECT userid FROM member where userid='" + id + "';"; // 중복 처리하기위한 쿼리
	connection.query(query, function (err, rows) {
		if (rows.length == 0) { // sql 제대로 연결되고 중복이 없는 경우
			var sql = {
				email: email,
				userid: id,
				password: hashPassword,
				salt: salt
			};
			// create query 
			var query = connection.query('insert into member set ?', sql, function (err, rows) {
				if (err) throw err;
				else {
					res.send("성공");
			}
			});
		} else {
			// 이미 있음 
			res.send("중복ID");
		}
	});


})
module.exports = router;