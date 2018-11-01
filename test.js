let config = require('./MacConfig');

before(async () => {
  driver = await config.beforeConfig();
  return driver;
});

after(async ()=>{
  await config.afterConfig();
})

describe('calculator test', () => {
  it('click button test', async () => {
      let buttonElement = await driver.elementByXPath("/AXApplication[@AXTitle='Calculator']/AXWindow[@AXIdentifier='_NS:477' and @AXSubrole='AXStandardWindow']/AXGroup[@AXIdentifier='_NS:444']/AXButton[@AXIdentifier='_NS:92']");
      await buttonElement.moveTo().sleep(1000);
      await driver.click();
  })
})