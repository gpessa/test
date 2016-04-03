require('./theme/theme.scss');

import angular from 'angular';
import ngMessages from 'angular-messages'

import registerDirectives from './factories';
import registerFactories from './directives';

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

const ngModule = angular.module('app', ['ngMessages']);

registerFactories(ngModule);
registerDirectives(ngModule);
