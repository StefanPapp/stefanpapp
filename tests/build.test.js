import { readFileSync, existsSync } from 'fs';
import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import { spawnSync } from 'child_process';

describe('Build output', () => {
  before(() => {
    const result = spawnSync('npx', ['astro', 'build'], { stdio: 'pipe' });
    if (result.status !== 0) {
      throw new Error(`Build failed: ${result.stderr?.toString()}`);
    }
  });

  it('generates index.html', () => {
    assert.ok(existsSync('dist/index.html'));
  });

  it('index.html contains meta description', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('<meta name="description"'));
  });

  it('index.html contains og:title', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('og:title'));
  });

  it('index.html contains skip-to-content link', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('skip-to-content'));
  });

  it('index.html contains cookie consent', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('cookie-consent'));
  });
});
