const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const htmlPath = path.join(__dirname, '..', 'index.html');

test('index.html exists and is readable', () => {
  assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
});

test('index.html contains valid SEO and Open Graph metadata', () => {
  const content = fs.readFileSync(htmlPath, 'utf8');
  assert.match(content, /<title>.*3D Studio Dubai.*<\/title>/i, 'Title should contain brand name');
  assert.match(content, /<meta\s+name=["']description["']/i, 'Meta description must exist');
  assert.match(content, /<meta\s+property=["']og:title["']/i, 'og:title must exist');
  assert.match(content, /<meta\s+property=["']og:description["']/i, 'og:description must exist');
  assert.match(content, /<meta\s+property=["']og:image["']\s+content=["']https:\/\/[^"']+["']/i, 'og:image must be an absolute URL with https://');
  assert.match(content, /<meta\s+name=["']twitter:image["']\s+content=["']https:\/\/[^"']+["']/i, 'twitter:image must be an absolute URL with https://');
  assert.match(content, /<link\s+rel=["']icon["']/i, 'Favicon link must exist');
});

test('index.html has correct hero elements and copy', () => {
  const content = fs.readFileSync(htmlPath, 'utf8');
  assert.match(content, /<h1[^>]*>\s*Let's Connect!\s*<\/h1>/i, 'H1 should be Let\'s Connect!');
  assert.match(content, /Discover our creations, follow our journey, or bring your next idea to life\./i, 'Supporting text must match spec');
  assert.match(content, /<img[^>]+src=["'][^"']*logo\.png["'][^>]*alt=["'][^"']*3D Studio Dubai[^"']*["']/i, 'Logo must have descriptive alt text');
});

test('index.html contains all 3 social buttons with exact links, targets, and rels', () => {
  const content = fs.readFileSync(htmlPath, 'utf8');
  
  // Instagram
  assert.ok(content.includes('https://www.instagram.com/3dstudio_dubai/'), 'Instagram URL must match exactly');
  assert.match(content, /Follow us on Instagram/i, 'Instagram label must match spec');

  // Facebook
  assert.ok(content.includes('https://www.facebook.com/profile.php?id=61596340364013'), 'Facebook URL must match exactly');
  assert.match(content, /Find us on Facebook/i, 'Facebook label must match spec');

  // WhatsApp
  assert.ok(content.includes('https://wa.me/971504681889'), 'WhatsApp URL must match exactly');
  assert.match(content, /Chat with us on WhatsApp/i, 'WhatsApp label must match spec');

  // Target and Rel security
  const linkMatches = content.match(/<a\s+[^>]*href=["'](https:\/\/(?:www\.instagram\.com\/3dstudio_dubai\/|www\.facebook\.com\/profile\.php\?id=61596340364013|wa\.me\/971504681889))["'][^>]*>/gi);
  assert.ok(linkMatches && linkMatches.length === 3, 'Should find 3 matching social links');

  for (const tag of linkMatches) {
    assert.match(tag, /target=["']_blank["']/i, 'Link must open in new tab');
    assert.match(tag, /rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/i, 'Link must have rel="noopener noreferrer"');
  }
});

test('index.html removes AI slop pill and verbose footer as requested', () => {
  const content = fs.readFileSync(htmlPath, 'utf8');
  assert.strictEqual(content.includes('Dubai, UAE • 3D Precision Studio'), false, 'Status pill must be removed');
  assert.strictEqual(content.includes('Designed with creativity. Made with precision.'), false, 'Footer tagline must be removed');
  assert.strictEqual(content.includes('All rights reserved'), false, 'Verbose copyright text must be removed');
});
