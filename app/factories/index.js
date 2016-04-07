// Register factory
import Auth from './auth';

// Facory where all the links used are stored and centralzied
import Links from './links';

export default ngModule => {
  Auth(ngModule);
  Links(ngModule);
};
