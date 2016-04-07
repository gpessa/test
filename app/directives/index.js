// Directive to create a login box
import login from './login';

// Directive to handle spinners
import spinner from './spinner';

// Custom validations to check the checkboxes are checked
import ngCheckboxRequired from './ng-checkbox-required';
// Custom validations to ensure password has the correct format
import ngPasswordStrenght from './ng-password-strenght';
// Custom navigation to check two fields has the same value
import ngMatch from './ng-match';

// Initialization of modules
export default ngModule => {
  ngCheckboxRequired(ngModule);
  ngPasswordStrenght(ngModule);
  ngMatch(ngModule);
  spinner(ngModule);
  login(ngModule);
};
