import test from 'node:test';
import assert from 'node:assert/strict';
import { validateManifest } from './validator.js';
test('accepts a cleared production manifest', () => assert.deepEqual(validateManifest({title:'Cut',project:'Campaign',stage:'postproduction',rights_status:'cleared'}), []));
test('blocks unknown rights', () => assert.deepEqual(validateManifest({title:'Cut',project:'Campaign',stage:'postproduction',rights_status:'unknown'}), ['rights_status=unknown is not releasable']));
