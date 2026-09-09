# Install SHAR Production Metadata MCP

Use this guide when an MCP-compatible client needs to install the server from source.

## Requirements

- Git
- Node.js 20 or newer

## Install

```bash
git clone https://github.com/SHARProduction/production-metadata-mcp.git
cd production-metadata-mcp
npm ci
```

## Client configuration

Configure the client to start the checked-out `server.js` file with Node. Replace the path with the absolute path to this checkout.

```json
{
  "command": "node",
  "args": ["/absolute/path/to/production-metadata-mcp/server.js"]
}
```

The server exposes `validate_production_manifest`. It is read-only: it validates the manifest passed by the client and does not modify files, call networks, or use credentials.

Run the repository test suite before distribution changes:

```bash
node --test
```