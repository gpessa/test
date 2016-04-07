// Theme
require('./css/theme.scss');

// External dependecies
import angular from 'angular';
import ngMessages from 'angular-messages';
import ngMocks from 'angular-mocks';

// Inclusion directives and factories
import registerFactories from './factories';
import registerDirectives from './directives';

// If the application is in TEST mode ngMock is added as dependecy otherwise
// it will use ngMockE2E with some fake calls and some timeout on them to show
// the loader

if(ON_TEST){

  var ngModule = angular.module('app', ['ngMessages', 'ngMock']);

} else {

  var ngModule = angular.module('app', ['ngMessages', 'ngMockE2E']);

  ngModule.config(function($provide) {
    $provide.decorator('$httpBackend', function($delegate) {
      var proxy = function(method, url, data, callback, headers) {
        var interceptor = function() {
          var delay = Math.floor(Math.random() * 2500) + 500;
          var _this = this,
          _arguments = arguments;
          setTimeout(function() {
            callback.apply(_this, _arguments);
          }, delay);
        };
        return $delegate.call(this, method, url, data, interceptor, headers);
      };
      for(var key in $delegate) {
        proxy[key] = $delegate[key];
      }
      return proxy;
    });
  })

  ngModule.run(function($httpBackend) {
    $httpBackend.whenPOST('/auth/register').respond(function(){
      var success, error, isSuccess;

      success = [200, { 'message' : 'user-registered'}];
      error = [500, { 'message' : 'something-went-wrong'}];
      isSuccess = Math.random() >= 0.5;

      return isSuccess ? success : error;
    });
  })

}


registerFactories(ngModule);
registerDirectives(ngModule);
