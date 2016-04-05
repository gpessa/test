import login from './login';
import spinnerLoading from './spinner-loading';

import ngCheckboxRequired from './ng-checkbox-required';
import ngPasswordStrenght from './ng-password-strenght';
import ngMatch from './ng-match';

export default ngModule => {
  ngCheckboxRequired(ngModule);
  ngPasswordStrenght(ngModule);
  ngMatch(ngModule);
  spinnerLoading(ngModule);
  login(ngModule);
};
