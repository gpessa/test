export default ngModule => {

  if (ON_TEST) {
    require('./ng-match.test').default(ngModule);
  }

  ngModule.directive('ngMatch', function($parse){
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ngModel) {
        var matchId = $parse(attrs.ngMatch);

        ngModel.$validators['match'] = () => {
          var match = getMatchValue();
          return ngModel.$viewValue === match;
        };

        scope.$watch(getMatchValue, () => {
            ngModel.$$parseAndValidate();
        });

        function getMatchValue(){
          var match = matchId(scope);
          if(angular.isObject(match) && match.hasOwnProperty('$viewValue')){
              match = match.$viewValue;
          }
          return match;
        }
      }
    };
  });
};
