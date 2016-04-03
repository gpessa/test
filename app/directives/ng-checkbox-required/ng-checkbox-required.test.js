export default ngModule => {
  describe(`ng-checkbox-required`, () => {
    beforeEach(window.module(ngModule.name));

    it(`should test properly`, () => {
      expect(true).to.be.true;
    });
  });
};
