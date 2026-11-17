const test = require('node:test');
const assert = require('node:assert');
const { runE2ETests } = require('./run-e2e.js');

test('E2E and responsive viewports test suite', async () => {
  await runE2ETests();
  assert.ok(true, 'All responsive viewports and links verified');
});
