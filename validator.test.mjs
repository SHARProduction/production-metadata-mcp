import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateManifest } from './validator.js';
test('accepts a cleared production manifest', () => assert.deepEqual(validateManifest({title:'Cut',project:'Campaign',stage:'postproduction',rights_status:'cleared'}), []));
test('blocks unknown rights', () => assert.deepEqual(validateManifest({title:'Cut',project:'Campaign',stage:'postproduction',rights_status:'unknown'}), ['rights_status=unknown is not releasable']));
test('publishes a schema aligned with validator fields', async () => {
  const schema = JSON.parse(await readFile(new URL('./schema/production-manifest.schema.json', import.meta.url)));
  assert.deepEqual(schema.required, ['title', 'project', 'stage', 'rights_status']);
  assert.deepEqual(schema.properties.stage.enum, ['preproduction', 'production', 'postproduction', 'delivery']);
  assert.deepEqual(schema.properties.rights_status.enum, ['cleared', 'licensed', 'synthetic', 'unknown']);
  assert.equal(schema.additionalProperties, true);
});
