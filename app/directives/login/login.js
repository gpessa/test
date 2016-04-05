export default ngModule => {

  if (ON_TEST) {
    require('./login.test').default(ngModule);
  }

  ngModule.directive('login', function(Auth) {
    return {
      restrict: 'E',
      template: require('./login.html'),
      controllerAs: '$ctrl',
      controller : /*@ngInject*/ function($scope) {

        this.login = function(form){
          form.loading = true;

          if(form.$valid){
            Auth
              .register(this.user)
              .then(response => {
                debugger;
                this.success = response.message;
                form.hide = true;
              })
              .catch(response => {
                debugger;
                this.errors = response.message;
                form.hide = false;
              })
              .finally((response)=> {
                debugger;
                form.loading = false;
              })
          }
        }

      }
    };
  });
};
