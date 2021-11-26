const puppeteer = require('puppeteer');
const downloadFolder = "./downloads";
const fs = require('fs');

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

(async () => {
  const browser = await puppeteer.launch({ headless: false }); 
//   await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.educative.io');

  console.log('sleeping');
  await sleep(30000);
  console.log('Awaking');

  await page.goto('https://www.educative.io/courses/grokking-the-system-design-interview/B8nMkqBWONo', {
    waitUntil: 'networkidle2',
  });
  await sleep(5000);
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
    for (let i=31; i<hrefs.length; i++) {
        console.log(`Downloading ${i}/${hrefs.length}`);
        //, url=${hrefs[i]}`);

        const downloadPath = `${downloadFolder}/${i}.pdf`;
        const downloadImgPath = `${downloadFolder}/${i}.png`;
        const downloadHtmlPath = `${downloadFolder}/${i}.html`;

        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.56 Safari/537.36';

        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.goto(hrefs[i], {
            waitUntil: 'networkidle0',
        });

        // await page.pdf({ 
        //     path: downloadPath, 
        //     printBackground: true,
        //     format: "Letter"
        // });

        // await page.screenshot({ 
        //     path: downloadImgPath,
        //     fullPage: true
        // });

        const html = await page.content();
        fs.writeFileSync(downloadHtmlPath, html);
        
        await page.close();
    }

  await browser.close();
})();