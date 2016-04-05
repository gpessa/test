import Auth from './auth';
import Links from './links';

export default ngModule => {
  Auth(ngModule);
  Links(ngModule);
};
