export default ngModule => {

  if (ON_TEST) {
    require('./login.test')(ngModule);
  }

  ngModule.directive('login', function(Auth) {
    return {
      restrict: 'E',
      template: require('./login.html'),
      controllerAs: '$ctrl',
      controller: /*@ngInject*/ function() {
        const $ctrl = this;

        $ctrl.login = (form) => {
          Auth.login($ctrl.user);
        }
      }
    };
  });
};
