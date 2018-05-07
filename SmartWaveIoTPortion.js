var mysql = require('mysql');
var fs = require('fs');
var http = require('http');

//Temp variables
var QRCode = 1;
var CookingInfo = 1;

fs.readFile('QR.txt', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  QRCode = data;
  console.log("id is " + data);
});


var con = mysql.createConnection({
  //host: "localhost",
  host: "137.112.234.73",
  user: "Admin",
  password: "Password",
  database: "SmartWave"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Get info for item id
  var sql = "SELECT * FROM items WHERE id = " + QRCode;
  con.query(sql, function (err, result) {
    if (err) throw err;
	console.log("id Info:");
    console.log(result);
	CookingInfo = result;
	//Write info for item id to text file
	fs.writeFile('CookingInfo.txt', JSON.stringify(CookingInfo), function (err) {
      if (err)
	    throw err;
	  else
        console.log('\nUpdated Info!');
	process.exit();
    });
	});
});

