import login from './login';
import spinner from './spinner';

import ngCheckboxRequired from './ng-checkbox-required';
import ngPasswordStrenght from './ng-password-strenght';
import ngMatch from './ng-match';

export default ngModule => {
  ngCheckboxRequired(ngModule);
  ngPasswordStrenght(ngModule);
  ngMatch(ngModule);
  spinner(ngModule);
  login(ngModule);
};
