var TwitterPackage = require('twitter');
var fs = require('fs');


var args = process.argv.slice(2);

var CookingInfo = fs.readFileSync('CookingInfo.txt', 'utf8')
	CookingInfo = CookingInfo.replace("[","");
	CookingInfo = CookingInfo.replace("]","");
	CookingInfo = JSON.parse(CookingInfo);
	

var secret = {
  consumer_key: '64faDumcJsEVKNjgKgSvainJV',
  consumer_secret: 'SgfQYWtvPV9uFW5M0Pi49v7tXHee5NYdVZNE157Al7z18Nq3VT',
  access_token_key: '993504183658696705-W6oqHgb8sDsCI52ErInQW6oUmgEcRRg',
  access_token_secret: 'FJ9QZkbgO3mDpIYIhwYrVIsTqSprbrbYdfug7K27m24AS'
}
var Twitter = new TwitterPackage(secret);

switch (args[0]) {
  case 'stir':

Twitter.post('direct_messages/new', {user:'Briant717', text: 'Your '
 + CookingInfo.Name + ' needs stirred!  Please stir and put back in.'}, function(error){
  if(error){
	console.log(error);
}
  });

  break;
  default:

Twitter.post('direct_messages/new', {user:'Briant717', text: 'Your '
 + CookingInfo.Name + ' is done!  Please let it sit for ' +
 CookingInfo.WaitTime + ' seconds before eating.'}, function(error){
  if(error){
	console.log(error);
}
});
}
  