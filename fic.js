// Libraries
var sys = require('sys'),
    http = require('http'),
    conn = require('./lib/node-twitter/connection'),
    friends = require('./lib/node-twitter/friends'),
    config = require('./configs/setup');

// Variables
var options = config.options,
    friendsFromA = null,
    friendsFromB = null;

// TwitterClient
var twitterClient = conn.unauthenticatedClient(config.API_PORT, config.API_URL);

// Set Arguments and call main if successfull
setArguments();

//call main function
main();

// Set arguments in respective options
function setArguments()
{
  try {
    var args = process.argv.slice(2);

    if (args.length < 2) {
      throw {
        code: 500,
        message: 'Invalid number of arguments'
      };
    }

    if (args.length === 4) {
      options.limit = args[1];
      args = args.slice(2);
    }

    if (args.length === 2) {
      options.userA = args[0];
      options.userB = args[1];
      return;
   }

   //throw an exception when above cases can't be implemented
   throw {
     code: 500,
     message: 'Invalid arguments.'
   };

  } catch(e) {
    //log the exception and exit
    console.log(e.message);
    process.exit(1);
  }
}

// Main
function main() {
  friends.get(options.userA, twitterClient, saveFriends, onRequestFail);
  friends.get(options.userB, twitterClient, saveFriends, onRequestFail);
};

//On success.

//check if both arrays
function saveFriends() {
  if (friendsFromA === null) {
      friendsFromA = toArray(this.data);
      return;
  }

  if (friendsFromB === null) {
      friendsFromB = toArray(this.data);
      getMutualFriends();
  }
}

function getMutualFriends() {
    var result = new Array(),
        totalFromA = friendsFromA.length;

    for (i = 0; i < totalFromA; i++) {
        if (inArray(friendsFromA[i], friendsFromB)) {
            result.push(friendsFromA[i]);
        }
    }

    //get total friends in common
    total = result.length;

    //print title
    console.log('=====FRIENDS IN COMMON=====');

    //print total number
    console.log('TOTAL:' + total + '\n');

    //Show number of results <= limit
    total = (total < options.limit) ? total : options.limit;

    for (i = 0; i < total; i++) {
        friends.getUserInfo(result[i], twitterClient, showUser, onRequestFail);
    }
}

function showUser() {
    console.log(formatOutput(this.data));
}

//If any twitter requests fail.
function onRequestFail(msg, response){
  console.log('Error: ' + msg);
  console.log(response);
  process.exit(1);
}

//Utils
function toArray(str) {
    str = str.slice(1, (str.length - 1));
    return str.split(',');
}

function inArray(needle, haystack) {
    var length = haystack.length;

    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) {
          return true;
        }
    }

    return false;
}

function formatOutput(data) {
    var pattern = /"screen_name\":\"[a-zA-Z0-9-_]*\"/;
    screenName = data.match(pattern)[0];

    return screenName.substring(15, (screenName.length - 1));
}