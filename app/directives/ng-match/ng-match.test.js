export default ngModule => {

  function getCompiledElement(){
    var html = '<form name="form">\
                  <input name="password" type="password" ng-model="password"/>\
                  <input name="confirmpassword" type="confirmpassword" ng-model="confirmpassword"/>\
                </form>';
    var element = angular.element(html);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe(`ng-match`, () => {
    beforeEach(function(){
      window.module(ngModule.name);

      inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();
      });

      directiveElem = getCompiledElement();
    });

    it(`i shoudl have html in the dom`, () => {
      var spanElement = directiveElem.find('dsdsddss');
      expect(spanElement).toBeDefined();
    });

  });
};
 
