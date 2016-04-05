require('./css/theme.scss');

import angular from 'angular';
import ngMessages from 'angular-messages';
import ngMocks from 'angular-mocks';

import registerFactories from './factories';
import registerDirectives from './directives';

const ngModule = angular.module('app', ['ngMessages', 'ngMockE2E']);

registerFactories(ngModule);
registerDirectives(ngModule);
