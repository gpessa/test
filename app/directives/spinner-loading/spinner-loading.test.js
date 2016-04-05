var sinon = require("sinon");

export default ngModule => {
  var Auth, compile, scope, directiveElem, $rootScope, formtest, $q, $http, $httpBackend, returnedPromise;

  function getCompiledElement(){
    var html = '<login></login>';
    var element = angular.element(html);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    angular.element(document.body).html();
    angular.element(document.body).append(compiledElement);
    return compiledElement;
  }

  describe(`login`, () => {

    beforeEach(window.module(ngModule.name));

    beforeEach(function(){
      inject(function (_$rootScope_, _$compile_, $injector, $q,  _$httpBackend_ , _Auth_) {
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $q = $q;
        $httpBackend = _$httpBackend_;
        compile = _$compile_;
        Auth = _Auth_;

        directiveElem = getCompiledElement(compile, scope);
      });
    });

    it(`should not call the service in case of mistakes`, () => {
      scope.form.email.$setViewValue('nomeecognome@gmail.com');
      scope.form.password.$setViewValue('abcc');
      scope.form.confirmpassword.$setViewValue('abc1c');
      scope.form.termsandconditions.$setViewValue(true);

      var spy = sinon.spy(Auth, 'register');
      directiveElem.find('button')[0].click();
      expect(spy.callCount).to.be.equal(0);
    });

    it(`should  call the service in case the form is correct`, () => {
      scope.form.email.$setViewValue('nomeecognome@gmail.com');
      scope.form.password.$setViewValue('abcc');
      scope.form.confirmpassword.$setViewValue('abcc');
      scope.form.termsandconditions.$setViewValue(true);

      $httpBackend.expectPOST('/auth/register').respond(200, { 'message' : 'user-registered'});

      var spy = sinon.spy(Auth, 'register');
      directiveElem.find('button')[0].click();
      expect(spy.callCount).to.be.equal(1);
    });


    it(`should display a message in case the server respond with a success`, (done) => {
      scope.form.email.$setViewValue('nomeecognome@gmail.com');
      scope.form.password.$setViewValue('abcc');
      scope.form.confirmpassword.$setViewValue('abcc');
      scope.form.termsandconditions.$setViewValue(true);

      $httpBackend.expectPOST('/auth/register').respond({ 'message' : 'user-registered'});

      directiveElem.find('button')[0].click();
      $httpBackend.flush();

      setTimeout(function(){
        var successdiv = document.querySelectorAll('.text--success');
        expect(successdiv.length).to.be.equal(1);
        done();
      }, 100);
    });

    it(`should display an error in case the server respond with a error`, (done) => {
      scope.form.email.$setViewValue('nomeecognome@gmail.com');
      scope.form.password.$setViewValue('abcc');
      scope.form.confirmpassword.$setViewValue('abcc');
      scope.form.termsandconditions.$setViewValue(true);

      $httpBackend.expectPOST('/auth/register').respond(500, { 'message' : 'something-went-wrong'});

      directiveElem.find('button')[0].click();
      $httpBackend.flush();

      setTimeout(function(){
        var errordiv = document.querySelectorAll('.text--error');
        expect(errordiv.length).to.be.equal(1);
        done();
      }, 100);
    });

  });
};
