var  defaults = {},
     responseData = {};

defaults.API_URL = 'api.twitter.com';
defaults.FRIENDS_PATH = '/1/friends/';
defaults.USERS_PATH = '/1/users/';

this.get = function(screenName, client, successCallback, failCallback) {
  var request,
      entryPoint = defaults.FRIENDS_PATH + 'ids.json?screen_name=' + screenName;

  request = client.request('GET', entryPoint, {'host': defaults.API_URL});

  request.addListener('response', function(response) {

    if (response.statusCode != 200) {
      failCallback('Request failed.', response);
      return false;
    }

    response.setEncoding('utf8');
    response.data = response.data ? response.data : '';
    response.on('data', function (chunk) { this.data += chunk;});
    response.on('end', successCallback);
  });

  request.end();
}

this.getUserInfo = function(userId, client, successCallback, failCallback) {
    var request,
        entryPoint = defaults.USERS_PATH + 'show.json?user_id=' + userId;

    request = client.request('GET', entryPoint, {'host': defaults.API_URL});

    request.addListener('response', function(response) {
        if (response.statusCode != 200) {
            failCallback('Request failed.', response);
            return false;
        }

        response.setEncoding('utf8');
        response.data = response.data ? response.data : '';
        response.on('data', function (chunk) { this.data += chunk;});
        response.on('end', successCallback);
    });

    request.end();
}