export default ngModule => {

  if (ON_TEST) {
    require('./login.test').default(ngModule);
  }

  ngModule.directive('login', /*@ngInject*/ (Auth, Links, $timeout) => {
    return {
      restrict: 'E',
      template: require('./login.html'),
      controllerAs: '$ctrl',
      controller: /*@ngInject*/ function($scope) {
        this.termsandconditions = Links.pages.termsandconditions;

        this.login = (form) => {
          if (form.$valid) {
            this.isLoading = true;

            Auth
              .register(this.user)
              .then(response => {
                this.success = true;
                form.hide = true;
              })
              .catch(response => {
                this.errors = true;
                form.hide = false;
              })
              .finally(response => {
                this.isLoading = false;
              })
          }
        }
      }
    };
  });

};
