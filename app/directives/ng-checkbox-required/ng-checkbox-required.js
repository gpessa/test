export default ngModule => {

  if (ON_TEST) {
    require('./ng-checkbox-required.test')(ngModule);
  }

  ngModule.directive('ngCheckboxRequired', function(){
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$validators['checkbox-required'] = function (modelValue, viewValue) {
          var value = modelValue || viewValue;
          var match = scope.$eval(attrs.ngTrueValue) || true;
          return value && match === value;
        };
      }
    };
  });
};
