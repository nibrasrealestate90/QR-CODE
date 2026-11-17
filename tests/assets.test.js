const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('assets/images/logo.png exists and has valid size', () => {
  const logoPath = path.join(__dirname, '..', 'assets', 'images', 'logo.png');
  assert.ok(fs.existsSync(logoPath), 'logo.png should exist');
  const stat = fs.statSync(logoPath);
  assert.ok(stat.size > 1000, 'logo.png should be larger than 1KB');
});

test('assets/images/favicon.png exists and has valid size', () => {
  const favPath = path.join(__dirname, '..', 'assets', 'images', 'favicon.png');
  assert.ok(fs.existsSync(favPath), 'favicon.png should exist');
  const stat = fs.statSync(favPath);
  assert.ok(stat.size > 100, 'favicon.png should be larger than 100 bytes');
});

test('assets/images/og-image.png exists and has valid size', () => {
  const ogPath = path.join(__dirname, '..', 'assets', 'images', 'og-image.png');
  assert.ok(fs.existsSync(ogPath), 'og-image.png should exist');
  const stat = fs.statSync(ogPath);
  assert.ok(stat.size > 1000, 'og-image.png should be larger than 1KB');
});
