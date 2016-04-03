export default ngModule => {

  if (ON_TEST) {
    require('./ng-password-strength.test')(ngModule);
  }

  ngModule.directive('ngPasswordStrength', function($parse){
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ngModel) {

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUWXYZ';

        ngModel.$validators['increasingStraightLetters'] = () => {
          let value = ngModel.$viewValue;
          let valid = false;
          return true;
        };

        ngModel.$validators['maxlength'] = () => {
          let value = ngModel.$viewValue;
          return value ? (value.length < 33) : true;
        };

        ngModel.$validators['onlyLowercaseCharacters'] = () => {
          let value = ngModel.$viewValue;
          return value ? (/^[a-z]+$/.test(value) === true) : true;
        };

        ngModel.$validators['notIol'] = () => {
          let value = ngModel.$viewValue;
          return value ? (/^[^iol]+$/.test(value) === true) : true;
        };

        ngModel.$validators['pairOfCharacters'] = () => {
          let value = ngModel.$viewValue;
          console.log(value);
          return value ? (/(.)\1+/g.test(value) === true) : true;
        };

        ngModel.$validators['increasingStraightLetters'] = () => {
          let value = ngModel.$viewValue;

          var matchfound = false;

          for (let i = 0; i <= value.length - 3; i++) {
            var s1 = value.charCodeAt(i);
            var s2 = value.charCodeAt(i + 1);
            var s3 = value.charCodeAt(i + 2);
            if (Math.abs(s1 - s2) === 1 && s1 - s2 === s2 - s3) {
              matchfound = true;
              break;
            }
          }

          return matchfound;
        };







        // debugger;
      }
    };
  });
};
