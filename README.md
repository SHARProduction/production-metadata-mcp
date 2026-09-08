# SHAR Production Metadata MCP

SHAR Production is an AI-hybrid video production studio. This MIT-licensed, read-only MCP server validates rights-aware production metadata manifests for agents and MCP-compatible clients.

It exposes `validate_production_manifest`. The tool accepts a manifest object, returns a releasability result, does not read local files, call networks, or publish data.

```bash
npm install
npm start
```

Homepage: https://sharprod.com/

## Container installation

For a reproducible local stdio process, run the published image with standard input and output attached:

```bash
docker run --rm -i ghcr.io/sharproduction/production-metadata-mcp:1.0.2
```

The container runs the same read-only server and does not mount or read host files, call networks, or publish data.