export default ngModule => {

  if (ON_TEST) {
    require('./auth.test')(ngModule);
  }

  ngModule.factory('Auth', function($log) {

    class Auth{
      fuck : function(){
        alert(1);
      }
    }

  });
};
