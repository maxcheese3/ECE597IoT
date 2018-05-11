var TwitterPackage = require('twitter');
var fs = require('fs');

var cookingInfo = ""

fs.readFileSync('CookingInfo.txt', function(err, data) {
	if (err) throw err;
	console.log(data);
	cookingInfo = JSON.parse(data);
	console.log(cookingInfo['Name'])
})
	
//var message = "Your " + cookingInfo

var secret = {
  consumer_key: '64faDumcJsEVKNjgKgSvainJV',
  consumer_secret: 'SgfQYWtvPV9uFW5M0Pi49v7tXHee5NYdVZNE157Al7z18Nq3VT',
  access_token_key: '993504183658696705-W6oqHgb8sDsCI52ErInQW6oUmgEcRRg',
  access_token_secret: 'FJ9QZkbgO3mDpIYIhwYrVIsTqSprbrbYdfug7K27m24AS'
}
var Twitter = new TwitterPackage(secret);


Twitter.post('direct_messages/new', {user:'Briant717', text: 'Your Food is done'}, function(error){
  if(error){
	console.log(error);
  }
});
  