var http = require('http');

var get = function(arr, data, callback) {
  http.get(arr[0]['href'], function(resp) {
    if (data[arr[0]]['merge'] === false) {
        data[arr[0]['name']] = resp;
    } else {
        Object.keys(resp).forEach(function(key) {
            data[arr[0]][key] = resp[key];
        });
    }
    arr.splice(0, 1);
    if (arr.length === 0) {
      callback(data);
    } else {
      get(arr, data, callback);
    }
  });
};

var test_get = function() {
  var urls = [
    {
      name: 'a',
      href: 'http://jsonplaceholder.typicode.com/posts/1'
    }, {
      name: 'b',
      href: 'http://jsonplaceholder.typicode.com/posts/2'
    }
  ];
  var data = {};
  get(urls, data, function(resp) {
    console.log(resp.a);
    console.log(resp.b);
    process.exit(resp);
  });
};

module.exports = {
  get: get,
  test_get: test_get
};

