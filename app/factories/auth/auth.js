export default ngModule => {

  if (ON_TEST) {
    require('./auth.test')(ngModule);
  }

  ngModule.factory('Auth', function() {
    var Auth = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      login(user, callback) {
        debugger;

        return $http
          .post('/auth/register', user)
          .then(res => {
          })
          .catch(err => {
          });
      }
    };

    return Auth;
  });
};
