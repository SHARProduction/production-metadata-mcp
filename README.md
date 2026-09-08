# SHAR Production Metadata MCP

SHAR Production is an AI-hybrid video production studio. This MIT-licensed, read-only MCP server validates rights-aware production metadata manifests for agents and MCP-compatible clients.

It exposes `validate_production_manifest`. The tool accepts a manifest object, returns a releasability result, does not read local files, call networks, or publish data.

```bash
npm install @sharproduction/production-metadata-mcp
production-metadata-mcp
```

Homepage: https://sharprod.com/

## JSON Schema

The machine-readable structural contract is available at [schema/production-manifest.schema.json](schema/production-manifest.schema.json). It mirrors the validator fields and deliberately distinguishes structural validity from the releasability policy for ights_status=unknown.

