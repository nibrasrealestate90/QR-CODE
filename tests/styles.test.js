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
