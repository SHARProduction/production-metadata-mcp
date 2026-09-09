# SHAR Production Metadata MCP

SHAR Production is an AI-hybrid video production studio. This MIT-licensed, read-only MCP server validates rights-aware production metadata manifests for agents and MCP-compatible clients.

It exposes `validate_production_manifest`. The tool accepts a manifest object, returns a releasability result, does not read local files, call networks, or publish data.

```bash
git clone https://github.com/SHARProduction/production-metadata-mcp.git
cd production-metadata-mcp
npm ci
node server.js
```

The npm package name is reserved in the project metadata, but a public npm release is not currently available. Use the source installation above until a public package release is independently verifiable.

Homepage: https://sharprod.com/

## JSON Schema

The machine-readable structural contract is available at [schema/production-manifest.schema.json](schema/production-manifest.schema.json). It mirrors the validator fields and deliberately distinguishes structural validity from the releasability policy for ights_status=unknown.

