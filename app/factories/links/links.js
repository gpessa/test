export default ngModule => {

  ngModule

    .factory('Links', function($q, $http) {
      return {
        'pages' : {
          'termsandconditions' : 'http://www.tnt.com/express/en_gb/site/home/terms-conditions.html'
        },
        'resources' : {
          'registration' : '/auth/register'
        }
      };
    });
};
