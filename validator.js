const stages = new Set(['preproduction', 'production', 'postproduction', 'delivery']);
const rights = new Set(['cleared', 'licensed', 'synthetic', 'unknown']);
/**
 * Validate a rights-aware production metadata manifest without reading files,
 * calling networks, or changing the supplied object.
 *
 * @param {{title?: string, project?: string, stage?: "preproduction"|"production"|"postproduction"|"delivery", rights_status?: "cleared"|"licensed"|"synthetic"|"unknown"}} manifest
 *   Manifest metadata supplied by an MCP client or a local application.
 * @returns {string[]} Validation errors. An empty array means the manifest is
 *   structurally valid and has an explicitly releasable rights status.
 */
export function validateManifest(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) return ['manifest must be a JSON object'];
  for (const field of ['title', 'project', 'stage', 'rights_status']) if (typeof manifest[field] !== 'string' || !manifest[field].trim()) errors.push(`${field} is required`);
  if (manifest.stage && !stages.has(manifest.stage)) errors.push(`stage must be one of: ${[...stages].join(', ')}`);
  if (manifest.rights_status && !rights.has(manifest.rights_status)) errors.push(`rights_status must be one of: ${[...rights].join(', ')}`);
  if (manifest.rights_status === 'unknown') errors.push('rights_status=unknown is not releasable');
  return errors;
}
