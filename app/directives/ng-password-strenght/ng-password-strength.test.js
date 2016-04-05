export default ngModule => {
  var compile, scope, directiveElem, formtest;

  function getCompiledElement(){
    var html = '<form name="formtest">\
                  <input name="password" type="password" ng-model="model.password" ng-password-strength=""/>\
                </form>';
    var element = angular.element(html);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe(`ng-password-strength`, () => {
    beforeEach(function(){
      window.module(ngModule.name);

      inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();
      });

      directiveElem = getCompiledElement();
      formtest = scope.formtest;
    });

    it('should have an error if the password length is higher than 33 characters', function() {
      formtest.password.$setViewValue('password');
      expect(formtest.password.$error.maxlength).to.equal(undefined);
    });

    it('should not have an error if the password length is lower than 33 characters', function() {
      formtest.password.$setViewValue('1234567890123456789012345678901234567890');
      expect(formtest.password.$error.maxlength).to.equal(true);
    });



    it('should have an error if the password does not contain only lower case alphabetic characters', function() {
      formtest.password.$setViewValue('password1');
      expect(formtest.password.$error.onlyLowercaseCharacters).to.equal(true);

      formtest.password.$setViewValue('password}');
      expect(formtest.password.$error.onlyLowercaseCharacters).to.equal(true);
    });

    it('should not have an error if the password does contain only lower case alphabetic characters', function() {
      formtest.password.$setViewValue('password');
      expect(formtest.password.$error.onlyLowercaseCharacters).to.equal(undefined);
    });



    it('should have an error if the password does contain characters like I, O, L', function() {
      formtest.password.$setViewValue('pwdi');
      expect(formtest.password.$error.notIol).to.equal(true);

      formtest.password.$setViewValue('pwdo');
      expect(formtest.password.$error.notIol).to.equal(true);

      formtest.password.$setViewValue('pwdl');
      expect(formtest.password.$error.notIol).to.equal(true);
    });

    it('should not have an error if the password does not contain characters like I, O, L', function() {
      formtest.password.$setViewValue('pwd');
      expect(formtest.password.$error.notIol).to.equal(undefined);
    });



    it('should have an error if the password does not contain at least two non-overlapping pairs of letters', function() {
      formtest.password.$setViewValue('bda');
      expect(formtest.password.$error.pairOfCharacters).to.equal(true);
    });

    it('should not have an error if the password does contain at least two non-overlapping pairs of letters', function() {
      formtest.password.$setViewValue('aa');
      expect(formtest.password.$error.pairOfCharacters).to.equal(undefined);
    });



    it('should have an error if the password include one increasing straight of at least three letters', function() {
      formtest.password.$setViewValue('aa');
      expect(formtest.password.$error.increasingStraightLetters).to.equal(true);
    });

    it('should not have an error if the password include one increasing straight of at least three letters', function() {
      formtest.password.$setViewValue('abc');
      expect(formtest.password.$error.increasingStraightLetters).to.equal(undefined);
    });

  });
};
