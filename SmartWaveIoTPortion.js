var mysql = require('mysql');
var fs = require('fs');
var http = require('http');

//Temp variables
var QRCode = 1;
var CookingInfo = 1;


QRCode = fs.readFileSync('QR.txt', 'utf8')
  console.log("id is " + QRCode);


var con = mysql.createConnection({
  //host: "localhost",
  host: "137.112.234.40",
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
	CookingInfo = JSON.stringify(CookingInfo)
	CookingInfo = CookingInfo.replace("[","");
	CookingInfo = CookingInfo.replace("]","");
	CookingInfo = JSON.parse(CookingInfo);
	fs.writeFileSync('SleepTime.txt', JSON.stringify(CookingInfo.CookingTime))
	fs.writeFileSync('StirAt.txt', JSON.stringify(CookingInfo.StirAt))
	process.exit();
    });
	});
});

