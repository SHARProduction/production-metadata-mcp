import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
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
test('serves MCP initialize over stdio', async () => {
  const child = spawn(process.execPath, ['server.js'], {cwd: new URL('.', import.meta.url), stdio: ['pipe', 'pipe', 'pipe']});
  let stdout = '';
  let stderr = '';
  let requested = false;
  try {
    const initialized = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`MCP initialize timed out: ${stderr}`)), 5000);
      child.on('error', reject);
      child.stdout.setEncoding('utf8');
      child.stderr.setEncoding('utf8');
      child.stdout.on('data', chunk => {
        stdout += chunk;
        const line = stdout.split('\n').find(value => value.trim());
        if (!line) return;
        clearTimeout(timeout);
        try { resolve(JSON.parse(line)); } catch (error) { reject(error); }
      });
      child.stderr.on('data', chunk => {
        stderr += chunk;
        if (!requested && stderr.includes('running on stdio')) {
          requested = true;
          const request = {jsonrpc:'2.0', id:1, method:'initialize', params:{protocolVersion:'2025-03-26', capabilities:{}, clientInfo:{name:'integration-test', version:'1.0.0'}}};
          child.stdin.write(`${JSON.stringify(request)}\n`);
        }
      });
      child.on('exit', code => {
        if (!stdout.trim()) reject(new Error(`MCP exited before initialize (code ${code}): ${stderr}`));
      });
    });
    assert.equal(initialized.jsonrpc, '2.0');
    assert.equal(initialized.id, 1);
    assert.equal(initialized.result.serverInfo.name, 'SHAR Production Metadata MCP');
    assert.equal(initialized.result.serverInfo.version, '1.0.5');
    assert.ok(initialized.result.capabilities.tools);
  } finally {
    child.kill();
  }
});