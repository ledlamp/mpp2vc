

var puppeteer = require('puppeteer');

(async () => {
    var browser = await puppeteer.launch(
        {headless:false}
    );
    var page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', req => {
        console.log(req);
        let headers = req.headers;
        headers['origin'] = 'http://www.multiplayerpiano.com';
        req.continue({
            headers: headers
        });
    });
    page.on('console', console.log);
    page.goto(`file://${__dirname}/ppage.html`)

})();






