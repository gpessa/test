export default ngModule => {
  var compile, scope, directiveElem, formtest;

  function getCompiledElement(){
    var html = '<form name="formtest">\
                  <input type="checkbox" ng-model="checkbox" ng-checkbox-required="" name="checkbox">\
                </form>';
    var element = angular.element(html);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe(`ng-checkbox-required`, () => {
    beforeEach(function(){
      window.module(ngModule.name);

      inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();
      });

      directiveElem = getCompiledElement();
      formtest = scope.formtest;
    });

    it('should fail if prestine', function() {
      expect(formtest.checkbox.$valid).to.equal(false);
    });

    it('should fail if not checked', function() {
      formtest.checkbox.$setViewValue(false);
      expect(formtest.checkbox.$valid).to.equal(false);
    });

    it('should pass if checked', function() {
      formtest.checkbox.$setViewValue(true);
      expect(formtest.checkbox.$valid).to.equal(true);
    });

  });
};
