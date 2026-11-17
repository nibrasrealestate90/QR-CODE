const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const headersPath = path.join(rootDir, '_headers');
const wranglerPath = path.join(rootDir, 'wrangler.toml');
const readmePath = path.join(rootDir, 'README.md');

test('Cloudflare Pages _headers file exists and specifies security & cache headers', () => {
  assert.ok(fs.existsSync(headersPath), '_headers must exist');
  const content = fs.readFileSync(headersPath, 'utf8');
  assert.match(content, /X-Content-Type-Options:\s*nosniff/i, 'Must contain nosniff header');
  assert.match(content, /X-Frame-Options:\s*DENY/i, 'Must contain X-Frame-Options header');
  assert.match(content, /Cache-Control/i, 'Must specify Cache-Control headers');
  assert.match(content, /\n\/\s*\n\s*Cache-Control:\s*public,\s*max-age=0/i, 'Must specify Cache-Control for root / path');
});

test('package.json declares playwright and tests/run-e2e.js has no hardcoded absolute user paths', () => {
  const pkgPath = path.join(rootDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  assert.ok(pkg.devDependencies && pkg.devDependencies.playwright, 'package.json must declare playwright in devDependencies');

  const e2eCode = fs.readFileSync(path.join(rootDir, 'tests', 'run-e2e.js'), 'utf8');
  assert.strictEqual(e2eCode.includes('/Users/subhamsantra'), false, 'tests/run-e2e.js must not contain hardcoded machine paths');
});

test('wrangler.toml exists and specifies pages_build_output_dir', () => {
  assert.ok(fs.existsSync(wranglerPath), 'wrangler.toml must exist');
  const content = fs.readFileSync(wranglerPath, 'utf8');
  assert.match(content, /name\s*=\s*["']3d-studio-dubai["']/i, 'Must set project name');
  assert.match(content, /pages_build_output_dir\s*=\s*["']\.["']/i, 'Must configure output directory to root .');
});

test('README.md contains comprehensive deployment and link verification instructions', () => {
  assert.ok(fs.existsSync(readmePath), 'README.md must exist');
  const content = fs.readFileSync(readmePath, 'utf8');
  assert.match(content, /3D Studio Dubai/i, 'Must introduce brand');
  assert.match(content, /Cloudflare Pages/i, 'Must cover Cloudflare Pages');
  assert.match(content, /wrangler pages deploy/i, 'Must provide wrangler deploy instructions');
  assert.match(content, /https:\/\/www\.instagram\.com\/3dstudio_dubai\//i, 'Must list Instagram URL');
  assert.match(content, /https:\/\/www\.facebook\.com\/profile\.php\?id=61596340364013/i, 'Must list Facebook URL');
  assert.match(content, /https:\/\/wa\.me\/971504681889/i, 'Must list WhatsApp URL');
});
