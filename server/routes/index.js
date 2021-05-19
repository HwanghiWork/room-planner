var express = require('express');
var router = express.Router();
var mysql = require('mysql');


const connection = mysql.createConnection({
    host:'localhost',
    port:3001,
    user:'root',
    password:'rudeo9552',
    database:'login_db'
});
connection.connect();

router.get('/api',function(req,res){

    res.send({greeting:'Hello'});
});

router.get('/project/select', function(req,res){
    
  connection.query('SELECT ID,NAME,AGE FROM user', (err, rows,fields) => {
      res.send(rows);
  })
});

module.exports = router;