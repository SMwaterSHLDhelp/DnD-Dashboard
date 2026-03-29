#!/usr/bin/env node
/**
 * JSON Validation Script
 * 
 * Validates all JSON files in the project to catch syntax errors early.
 * This script is designed to prevent the JSON parse errors that have
 * previously caused npm install failures.
 * 
 * Usage: node scripts/validate-json.js
 * 
 * Can be integrated as a preinstall/prebuild hook to catch errors early.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// JSON files to validate
const jsonFiles = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'vite.config.json',
  'tailwind.config.json',
  'postcss.config.json',
  '.eslintrc.json',
  '.prettierrc',
  'data/spells.json',
  'data/*.json'
];

// Directories to exclude from search
const excludeDirs = [
  'node_modules',
  '.git',
  '.cache',
  'dist',
  'build',
  '.vite',
  '.config'
];

let hasErrors = false;

/**
 * Recursively find all JSON files in a directory
 */
function findJsonFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!excludeDirs.includes(entry.name) && !entry.name.startsWith('.')) {
        findJsonFiles(fullPath, files);
      }
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Validate a single JSON file
 */
function validateJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    console.log(`\u2713 ${path.relative(projectRoot, filePath)}`);
    return true;
  } catch (error) {
    console.error(`\u2717 ${path.relative(projectRoot, filePath)}`);
    console.error(`  Error: ${error.message}`);
    
    // Provide helpful context for the error
    if (error instanceof SyntaxError) {
      const lines = fs.readFileSync(filePath, 'utf8').split('\n');
      const match = error.message.match(/position (\d+)/);
      if (match) {
        const position = parseInt(match[1]);
        let lineNum = 1;
        let charCount = 0;
        for (let i = 0; i < lines.length; i++) {
          charCount += lines[i].length + 1;
          if (charCount > position) {
            lineNum = i + 1;
            break;
          }
        }
        console.error(`  Line: ${lineNum}`);
        if (lines[lineNum - 1]) {
          console.error(`  Content: ${lines[lineNum - 1].trim()}`);
        }
      }
    }
    
    return false;
  }
}

console.log('Validating JSON files...\n');

// Validate explicitly listed files first
for (const file of jsonFiles) {
  if (file.includes('*')) continue; // Skip glob patterns
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    if (!validateJsonFile(filePath)) {
      hasErrors = true;
    }
  }
}

// Also scan src and data directories for any JSON files
const additionalJsonFiles = findJsonFiles(path.join(projectRoot, 'src'));
const dataJsonFiles = findJsonFiles(path.join(projectRoot, 'data'));

for (const filePath of [...additionalJsonFiles, ...dataJsonFiles]) {
  if (!jsonFiles.some(f => path.join(projectRoot, f) === filePath)) {
    if (!validateJsonFile(filePath)) {
      hasErrors = true;
    }
  }
}

console.log('');

if (hasErrors) {
  console.error('\u274C JSON validation failed! Please fix the errors above.\n');
  process.exit(1);
} else {
  console.log('\u2705 All JSON files are valid!\n');
  process.exit(0);
}
