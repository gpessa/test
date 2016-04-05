// Directive to create a login box
import login from './login';

// Directive to handle spinners
import spinner from './spinner';

// Custom validations
import ngCheckboxRequired from './ng-checkbox-required';
import ngPasswordStrenght from './ng-password-strenght';
import ngMatch from './ng-match';

// Initialization of modules
export default ngModule => {
  ngCheckboxRequired(ngModule);
  ngPasswordStrenght(ngModule);
  ngMatch(ngModule);
  spinner(ngModule);
  login(ngModule);
};
