import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'oxfmt';
import { constants, generateApi } from 'swagger-typescript-api';

const frontend = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(frontend, 'generated/api-types');
const { files } = await generateApi({
  input: resolve(frontend, '../backend/doc/swagger/talebound.swagger.json'),
  output: false,
  modular: true,
  httpClientType: 'axios',
  singleHttpClient: true,
  generateResponses: true,
  primitiveTypeConstructs: {
    // Protobuf bytes are base64 strings in the gateway's JSON API, not Blobs.
    string: { byte: () => 'string' },
  },
});

const {
  $schema: _schema,
  ignorePatterns: _ignorePatterns,
  ...formatOptions
} = JSON.parse(await readFile(resolve(frontend, '.oxfmtrc.json'), 'utf8'));
// Keep generated code type checked; the upstream header disables it by default.
const header = constants.FILE_PREFIX.replace(/^\/\/ @ts-nocheck\r?\n/m, '').replace(
  '/* eslint-disable */',
  '/* oxlint-disable */',
);
const generated = await Promise.all(
  files.map(async ({ fileName, fileExtension, fileContent }) => {
    const name = `${fileName}${fileExtension}`;
    const { code, errors } = await format(name, header + fileContent, formatOptions);
    if (errors.length > 0) {
      throw new Error(
        `Could not format ${name}: ${errors.map(({ message }) => message).join('; ')}`,
      );
    }
    return { name, content: code };
  }),
);

await mkdir(output, { recursive: true });
const names = new Set(generated.map(({ name }) => name));
for (const name of await readdir(output)) {
  if (name.endsWith('.ts') && !names.has(name)) await unlink(resolve(output, name));
}
for (const { name, content } of generated) {
  await writeFile(resolve(output, name), content);
}
console.log(`Generated ${generated.length} API files from the local backend schema.`);
