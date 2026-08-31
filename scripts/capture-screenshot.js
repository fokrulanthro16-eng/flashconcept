const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function capture() {
  const assetsDir = path.join(__dirname, '..', 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const outputPath = path.join(assetsDir, 'preview.png');

  console.log('Launching browser for screenshot capture...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 2, // Retina 2x high resolution
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // Wait 1.5s for Framer motion and SVG components to settle
  await new Promise((r) => setTimeout(r, 1500));

  console.log(`Saving screenshot to ${outputPath}...`);
  await page.screenshot({
    path: outputPath,
    clip: {
      x: 0,
      y: 0,
      width: 1440,
      height: 960,
    },
  });

  await browser.close();
  console.log('Preview screenshot captured successfully!');
}

capture().catch((err) => {
  console.error('Screenshot capture error:', err);
  process.exit(1);
});
