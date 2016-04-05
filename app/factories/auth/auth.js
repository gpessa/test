export default ngModule => {

  if (ON_TEST) {
    require('./auth.test').default(ngModule);
  }

  ngModule

    // .config(function($provide) {
    //   $provide.decorator('$httpBackend', function($delegate) {
    //     var proxy = function(method, url, data, callback, headers) {
    //       var interceptor = function() {
    //         var _this = this,
    //         _arguments = arguments;
    //         setTimeout(function() {
    //           callback.apply(_this, _arguments);
    //         }, 500);
    //       };
    //       return $delegate.call(this, method, url, data, interceptor, headers);
    //     };
    //     for(var key in $delegate) {
    //       proxy[key] = $delegate[key];
    //     }
    //     return proxy;
    //   });
    // })
    //
    // .run(function($httpBackend) {
    //   $httpBackend.whenRoute('POST','/auth/register').respond(function(){
    //     var success = [
    //         200, { 'message' : 'user-registered'}
    //     ];
    //
    //     var error = [
    //         500, { 'message' : 'something-went-wrong'}
    //     ]
    //
    //     console.log('QUI STICAZZI');
    //
    //     var isSuccess = Math.random() >= 0.5;
    //
    //     return isSuccess ? success : error;
    //   });
    // })

    .factory('Auth', function($q, $http) {
      var Auth = {

        register(user, callback) {
          var deferred = $q.defer();
          
          $http
            .post('/auth/register', user)
            .then(function(res){
              deferred.resolve(res.data);
            })
            .catch(err => {
              deferred.reject(err.data);
            });

          return deferred.promise;
        }
      };

      return Auth;
    });
};
