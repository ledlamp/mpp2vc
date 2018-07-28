const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg));
  /*await page.evaluate(function(){
      navigator.requestMIDIAccess().then(console.log).catch(console.error);
  })*/
  await page.goto("http://www.multiplayerpiano.com");
})();