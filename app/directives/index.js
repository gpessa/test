import login from './login';

import ngCheckboxRequired from './ng-checkbox-required';
import ngPasswordStrenght from './ng-password-strenght';
import ngMatch from './ng-match';

export default ngModule => {
  login(ngModule);
  ngCheckboxRequired(ngModule);
  ngPasswordStrenght(ngModule);
  ngMatch(ngModule);
};
