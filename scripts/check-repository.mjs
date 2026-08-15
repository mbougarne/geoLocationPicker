import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';

const requiredFiles = [
  'AGENTS.md',
  '.github/copilot-instructions.md',
  'CONTRIBUTING.md',
  'docs/AGENTIC_RULES.md',
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required repository file: ${file}`);
  }
}

const majorVersion = Number.parseInt(process.versions.node.split('.')[0], 10);
if (majorVersion < 22) {
  throw new Error(`Node.js 22 or newer is required; found ${process.versions.node}`);
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
if (packageJson.engines?.node !== '>=22') {
  throw new Error('package.json must require Node.js >=22');
}

if (readFileSync('.nvmrc', 'utf8').trim() !== '22') {
  throw new Error('.nvmrc must specify Node.js 22');
}

console.log('Repository policy checks passed.');