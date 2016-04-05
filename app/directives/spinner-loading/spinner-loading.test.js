var sinon = require("sinon");

export default ngModule => {
  var compile, scope, directiveElem, $rootScope;

  function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
  }

  function getCompiledElement(){
    var html = '<div spinner-loading="isLoading"></div>';
    var element = angular.element(html);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    angular.element(document.body).html();
    angular.element(document.body).append(compiledElement);
    return compiledElement;
  }

  describe(`spinner-loading`, () => {

    beforeEach(window.module(ngModule.name));

    beforeEach(function(){
      inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        compile = _$compile_;

        directiveElem = getCompiledElement(compile, scope);
      });
    });

    it(`should not have a spinner at the beginning`, () => {
      scope.$apply();
      var spinner = directiveElem[0].querySelector('.spinner-loading');
      expect( isHidden(spinner) ).to.equal(true);
    });

    it(`should have a spinner if the element is loading`, () => {
      scope.isLoading = true;
      scope.$apply();
      var spinner = directiveElem[0].querySelector('.spinner-loading');
      expect( isHidden(spinner) ).to.equal(false);
    });

    it(`should not have a spinner if the element is not loading`, () => {
      scope.isLoading = false;
      scope.$apply();
      var spinner = directiveElem[0].querySelector('.spinner-loading');
      expect( isHidden(spinner) ).to.equal(true);
    });

  });
};
