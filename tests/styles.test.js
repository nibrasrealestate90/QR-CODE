const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'style.css');

test('assets/css/style.css exists and is readable', () => {
  assert.ok(fs.existsSync(cssPath), 'style.css must exist');
});

test('style.css defines essential design tokens and CSS custom properties', () => {
  const content = fs.readFileSync(cssPath, 'utf8');
  assert.match(content, /--bg-primary/, 'Must define --bg-primary token');
  assert.match(content, /--text-primary/, 'Must define --text-primary token');
  assert.match(content, /--accent-whatsapp/, 'Must define --accent-whatsapp token');
  assert.match(content, /--card-bg/, 'Must define --card-bg token');
  assert.match(content, /--border-color/, 'Must define --border-color token');
  assert.match(content, /--text-muted:\s*#555A64/i, '--text-muted must meet WCAG contrast standard (>= 4.5:1)');
});

test('style.css ensures label wrapping and mobile size to prevent text truncation', () => {
  const content = fs.readFileSync(cssPath, 'utf8');
  assert.match(content, /\.action-label\s*\{[^}]*white-space:\s*normal/i, '.action-label must allow natural wrapping');
  assert.match(content, /max-width:\s*380px[^}]*\.action-label/s, 'Must have compact screen sizing for action-label');
});

test('style.css implements resilient safe-area body padding using max()', () => {
  const content = fs.readFileSync(cssPath, 'utf8');
  assert.match(content, /padding:\s*max\(\s*24px\s*,\s*env\(\s*safe-area-inset-top\s*\)\s*\)/i, 'Body padding must use max() for safe-area insets');
});

test('style.css implements prominent styling for WhatsApp', () => {
  const content = fs.readFileSync(cssPath, 'utf8');
  assert.match(content, /\.action-card--prominent|\.action-card--whatsapp/, 'Must define prominent WhatsApp styles');
  assert.match(content, /\.priority-badge/, 'Must define priority-badge styling');
});

test('style.css implements accessible focus rings and reduced-motion queries', () => {
  const content = fs.readFileSync(cssPath, 'utf8');
  assert.match(content, /:focus-visible/, 'Must define :focus-visible rules for keyboard navigation');
  assert.match(content, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/, 'Must include prefers-reduced-motion accessibility media query');
});

test('style.css includes responsive breakpoints and mobile-first rules', () => {
  const content = fs.readFileSync(cssPath, 'utf8');
  assert.match(content, /@media/, 'Must include responsive media queries');
  assert.match(content, /box-sizing:\s*border-box/, 'Must use standard box-sizing');
});
