export default ngModule => {
  describe(`auth`, () => {
    beforeEach(window.module(ngModule.name));

    it(`should test properly`, () => {
      expect(true).to.be.true;
    });
  });
};
