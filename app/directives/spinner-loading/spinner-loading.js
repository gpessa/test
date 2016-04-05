export default ngModule => {

  ngModule.directive('spinnerLoading', function($parse) {
    return {
      restrict: 'A',
      controllerAs: '$ctrl',
      link : function(scope, element, attrs) {
        var spinner, spinnerLoading;

        element.addClass('spinner-loading-wrapper');
        spinner = element.append('<div class="spinner-loading-wrapper__elemenet"></div>');
        spinnerLoading = $parse(attrs.spinnerLoading);

        scope.$watch(isLoading, function(isLoading){
          console.log(isLoading == true);
          element.toggleClass('spinner-loading-wrapper--show-element', isLoading == true );
        });

        function isLoading(){
          return spinnerLoading(scope);
        }
      }
    };
  });

};
