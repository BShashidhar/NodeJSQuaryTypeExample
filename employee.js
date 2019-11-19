const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('.'));//it includes all .files
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//whether you want nested objects support  or not

var result;
 app.post('/add', function (req, res) {
	connection.query("insert into emp values (?,?,?)", [req.body.id,req.body.name,req.body.compony], (err, res1) => {
       if (err) {
            result = err;
		console.log("trouble " + err);
       } else {
           result = res1;
		   
		console.log("success" + JSON.stringify(result));
       }		
	  res.send({"message":res1.affectedRows});
	});
 });

app.post('/eup', function (req, res) {
    console.log(req.body.id);
    connection.query('update emp set name=?,compony=? where id = ?', [req.body.name,req.body.compony,req.body.id], (err, res1) => {
		if (err) {
             result = err;
	 		console.log("update failure" + result);
         } else {
           result = res1;
		   
		console.log("success" + JSON.stringify(result));
       }		
	  res.send({"message":res1.affectedRows});
    });
});

// app.get('/msel', function (req, res) {
	
// 	console.log("62 " + req.query.xyz);
//     connection.query("select * from employee where depid = ?", [req.query.xyz], (err, res1) => {
//         if (err) {
//             result = err;
// 			console.log("single select failure" + result);
//         } else {
//             result = res1;
// 			console.log("single select success" + result)
//         }
//         res.send(result);
//     });
// });


 app.post('/del', function (req, res) {
     connection.query('delete from emp where id = ?', [req.body.id], (err, res1) => {
        if (err) {
            result = err;
		console.log("trouble " + err);
       } else {
           result = res1;
		   console.log("success" + JSON.stringify(result));
       }		
	  res.send({"message":res1.affectedRows});
     });
 });

  app.get('/search', function (req, res) {
     connection.query('select * from emp where id=?', [req.query.id], (err, res1) => {
         if (err) {
             res.send(err);
         } 
		 else
		 {			
			if(res1=="")
			{
				res.send({"message":'search'});
			}
			else
			{
				var result=JSON.stringify(res1);
				res.send(result);
				console.log(result);
			}
		} 
    });
 });

app.listen(8082, function () {
    console.log("server listening at port 8082...");
});