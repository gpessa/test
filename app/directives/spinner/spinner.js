export default ngModule => {

  if (ON_TEST) {
    require('./spinner.test').default(ngModule);
  }

  ngModule.directive('spinner', function($parse) {
    return {
      restrict: 'A',
      controllerAs: '$ctrl',
      link : function(scope, element, attrs) {
        var spinner, spinnerIsLoading;

        spinner = angular.element('<div class="spinner--element"></div>');
        spinnerIsLoading = $parse(attrs.spinner);

        element
          .prepend(spinner)
          .addClass('spinner');

        scope.$watch(isLoading, function(isLoading){
          spinner.toggleClass('ng-hide', !isLoading);
        });

        function isLoading(){
          return spinnerIsLoading(scope) || false;
        }
      }
    };
  });

};
