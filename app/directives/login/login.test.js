var sinon = require("sinon");

export default ngModule => {
  var Auth, compile, scope, directiveElem, formtest, $q, $http, $httpBackend;

  function getCompiledElement(){
    var html = '<login></login>';
    var element = angular.element(html);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe(`login`, () => {

    beforeEach(window.module(ngModule.name));

    // beforeEach(window.module(function (_$provide_) {
    //   _$provide_.decorator('Auth', function($delegate) {
    //     $delegate.register = function(){
    //       var deferred = $q.defer();
    //
    //       setTimeout(function(){
    //         deferred.reject({ 'message' : 'user-registered'});
    //         deferred.resolve({ 'message' : 'user-registered'});
    //         deferred.notify({ 'message' : 'user-registered'});
    //       }, 0);
    //
    //       return deferred.promise;
    //     }
    //     return $delegate;
    //   });
    // }));

    beforeEach(function(){
      inject(function (_$rootScope_, _$compile_, $q, $http, $httpBackend, _Auth_) {
        scope = _$rootScope_.$new();
        $q = $q;
        $http = $http;
        $httpBackend = $httpBackend;
        compile = _$compile_;
        Auth = _Auth_;

        directiveElem = getCompiledElement();
      });
    });

    // it(`should not call the service in case of mistakes`, () => {
    //   scope.form.email.$setViewValue('nomeecognome@gmail.com');
    //   scope.form.password.$setViewValue('abcc');
    //   scope.form.confirmpassword.$setViewValue('abc1c');
    //   scope.form.termsandconditions.$setViewValue(true);
    //
    //   var spy = sinon.spy(Auth, 'register');
    //   directiveElem.find('button')[0].click();
    //   expect(spy.callCount).to.be.equal(0);
    // });
    //
    // it(`should not call the service in case the form is correct`, () => {
    //   scope.form.email.$setViewValue('nomeecognome@gmail.com');
    //   scope.form.password.$setViewValue('abcc');
    //   scope.form.confirmpassword.$setViewValue('abcc');
    //   scope.form.termsandconditions.$setViewValue(true);
    //
    //   var spy = sinon.spy(Auth, 'register');
    //   directiveElem.find('button')[0].click();
    //   expect(spy.callCount).to.be.equal(1);
    // });

    it(`should display a confirmation message in case of correct data`, (done) => {
      scope.form.email.$setViewValue('nomeecognome@gmail.com');
      scope.form.password.$setViewValue('abcc');
      scope.form.confirmpassword.$setViewValue('abcc');
      scope.form.termsandconditions.$setViewValue(true);

      var spy = sinon.spy(Auth, 'register');
      directiveElem.find('button')[0].click();
      expect(spy.callCount).to.be.equal(1);

      setTimeout(function(){
        console.log('QUI 1');
        console.log(scope.form.loading);
        console.log(scope.success);
        console.log(scope.errors);
        done()
      }, 1000);
    });

  });
};
