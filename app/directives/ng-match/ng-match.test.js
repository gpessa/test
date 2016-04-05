export default ngModule => {
  var compile, scope, directiveElem, formtest;

  function getCompiledElement() {
    var html = '<form name="formtest">\
                  <input name="password" type="password" ng-model="model.password"/>\
                  <input name="confirmpassword" type="password" ng-model="model.confirmpassword" ng-match="model.password"/>\
                </form>';
    var element = angular.element(html);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe(`ng-match`, () => {
    beforeEach(function() {
      window.module(ngModule.name);

      inject(function($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
      });

      directiveElem = getCompiledElement();
      formtest = scope.formtest;
    });

    it('should pass with equal password', function() {
      formtest.password.$setViewValue('password');
      formtest.confirmpassword.$setViewValue('password');

      expect(formtest.confirmpassword.$valid).to.equal(true);
    });

    it('should fail with different password', function() {
      formtest.password.$setViewValue('password');
      formtest.confirmpassword.$setViewValue('differentpassword');

      expect(formtest.confirmpassword.$valid).to.equal(false);
    });

  });
};