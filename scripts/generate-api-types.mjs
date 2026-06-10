import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = resolve(rootDir, 'src/shared/api/generated/schema.ts');
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
const schemaUrl = new URL('/api/schema/', apiUrl).toString();
const openApiTypescriptCli = resolve(rootDir, 'node_modules/openapi-typescript/bin/cli.js');

await mkdir(dirname(outputFile), { recursive: true });

console.log(`Generating OpenAPI types from ${schemaUrl}`);
console.log(`Output: ${outputFile}`);

try {
  const { stdout, stderr } = await execFileAsync(
    process.execPath,
    [openApiTypescriptCli, schemaUrl, '-o', outputFile],
    { cwd: rootDir },
  );

  if (stdout) {
    console.log(stdout);
  }

  if (stderr) {
    console.error(stderr);
  }

  console.log('OpenAPI types generated successfully.');
} catch (error) {
  console.error('OpenAPI type generation failed.');
  console.error('Make sure the backend is running and exposes /api/schema/.');
  throw error;
}
