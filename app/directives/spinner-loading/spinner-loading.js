export default ngModule => {

  if (ON_TEST) {
    require('./spinner-loading.test').default(ngModule);
  }

  ngModule.directive('spinnerLoading', function($parse) {
    return {
      restrict: 'A',
      controllerAs: '$ctrl',
      link : function(scope, element, attrs) {
        var spinner, spinnerLoading;

        spinner = angular.element('<div class="spinner-loading"></div>');
        spinnerLoading = $parse(attrs.spinnerLoading);

        element.append(spinner)

        scope.$watch(isLoading, function(isLoading){
          spinner.toggleClass('ng-hide', !isLoading);
        });

        function isLoading(){
          return spinnerLoading(scope) || false;
        }
      }
    };
  });

};
