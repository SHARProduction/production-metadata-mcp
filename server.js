#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import { validateManifest } from './validator.js';

function createServer() {
  const server = new McpServer({name: 'SHAR Production Metadata MCP', version: '1.0.3'}, {instructions: 'Read-only production metadata validation by SHAR Production.'});
  server.registerTool('validate_production_manifest', {
    title: 'Validate production metadata manifest',
    description: 'Checks required project metadata, production stage, and declared rights status. Does not read files, call networks, or publish data.',
    inputSchema: {manifest: z.record(z.string(), z.unknown())},
    annotations: {readOnlyHint: true, destructiveHint: false, openWorldHint: false}
  }, async ({manifest}) => {
    const errors = validateManifest(manifest);
    const output = {releasable: errors.length === 0, errors};
    return {content: [{type: 'text', text: JSON.stringify(output)}], structuredContent: output, isError: errors.length > 0};
  });
  return server;
}

void serveStdio(createServer);
console.error('SHAR Production Metadata MCP running on stdio');

