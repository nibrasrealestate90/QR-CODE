const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');

// Resolve playwright from local or neighbor node_modules
let playwright;
try {
  playwright = require('playwright');
} catch (e) {
  try {
    playwright = require(path.resolve(__dirname, '../../3D PRINTING/node_modules/playwright'));
  } catch (err) {
    playwright = require('/Users/subhamsantra/Desktop/Dashboard/3D PRINTING/node_modules/playwright');
  }
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function createStaticServer(rootDir) {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(rootDir, reqPath);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

async function runE2ETests() {
  console.log('🚀 Starting E2E and Responsiveness Test Suite...');
  
  const rootDir = path.resolve(__dirname, '..');
  const server = createStaticServer(rootDir);
  
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`📡 Local test server running at ${baseUrl}`);

  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const viewports = [
    { name: 'iphone-14', width: 390, height: 844, isMobile: true },
    { name: 'samsung-galaxy', width: 360, height: 800, isMobile: true },
    { name: 'compact-phone', width: 320, height: 568, isMobile: true },
    { name: 'ipad-mini', width: 768, height: 1024, isMobile: false },
    { name: 'desktop-macbook', width: 1280, height: 800, isMobile: false }
  ];

  try {
    for (const vp of viewports) {
      console.log(`\n📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile
      });
      const page = await context.newPage();

      // Monitor console errors
      const consoleErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => consoleErrors.push(err.message));

      // Navigate to landing page
      const response = await page.goto(baseUrl, { waitUntil: 'networkidle' });
      assert.strictEqual(response.status(), 200, `Page failed to load, status: ${response.status()}`);
      assert.strictEqual(consoleErrors.length, 0, `Console errors detected: ${consoleErrors.join('; ')}`);

      // Verify no horizontal overflow
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
        };
      });
      assert.strictEqual(overflow.hasHorizontalScroll, false, `Horizontal overflow on ${vp.name}: scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}`);

      // Verify brand logo loaded
      const logo = page.locator('.brand-logo');
      await logo.waitFor({ state: 'visible' });
      const logoNaturalWidth = await logo.evaluate((el) => el.naturalWidth);
      assert.ok(logoNaturalWidth > 0, 'Logo image must render with natural dimensions');

      // Verify Hero Title
      const h1Text = await page.locator('h1').textContent();
      assert.strictEqual(h1Text.trim(), "Let's Connect!", 'H1 text must match spec');

      // Verify Social Media links
      const expectedLinks = [
        {
          name: 'WhatsApp',
          selector: 'a.action-card--whatsapp',
          href: 'https://wa.me/971504681889',
          prominent: true
        },
        {
          name: 'Instagram',
          selector: 'a.action-card--instagram',
          href: 'https://www.instagram.com/3dstudio_dubai/',
          prominent: false
        },
        {
          name: 'Facebook',
          selector: 'a.action-card--facebook',
          href: 'https://www.facebook.com/profile.php?id=61596340364013',
          prominent: false
        }
      ];

      for (const item of expectedLinks) {
        const link = page.locator(item.selector);
        await link.waitFor({ state: 'visible' });
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');

        assert.strictEqual(href, item.href, `${item.name} href must match exact spec`);
        assert.strictEqual(target, '_blank', `${item.name} must have target="_blank"`);
        assert.ok(rel && rel.includes('noopener') && rel.includes('noreferrer'), `${item.name} must have rel="noopener noreferrer"`);

        // Check bounding box / touch target size (at least 48px height)
        const box = await link.boundingBox();
        assert.ok(box && box.height >= 48, `${item.name} touch target height must be >= 48px (got ${box.height})`);

        if (item.prominent) {
          const classAttr = await link.getAttribute('class');
          assert.ok(classAttr.includes('action-card--prominent'), 'WhatsApp card must have prominent class');
          const badge = link.locator('.priority-badge');
          await badge.waitFor({ state: 'visible' });
        }
      }

      // Capture screenshot
      const screenshotFile = path.join(screenshotsDir, `${vp.name}.png`);
      await page.screenshot({ path: screenshotFile, fullPage: true });
      console.log(`📸 Screenshot captured: tests/screenshots/${vp.name}.png`);

      await context.close();
    }

    console.log('\n✅ All viewports passed responsive and QA checks with 0 errors!');
  } finally {
    await browser.close();
    server.close();
  }
}

if (require.main === module) {
  runE2ETests().catch((err) => {
    console.error('❌ E2E Test Suite Failed:', err);
    process.exit(1);
  });
}

module.exports = { runE2ETests };
