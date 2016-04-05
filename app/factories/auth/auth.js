export default ngModule => {

  ngModule.factory('Auth', function($q, $http, Links) {
    var Auth = {

      register(user, callback) {
        var deferred = $q.defer();

        $http
          .post(Links.resources.registration, user)
          .then(function(res) {
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