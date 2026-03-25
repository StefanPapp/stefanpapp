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

  it('index.html contains nav element', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('<nav'));
  });

  it('index.html contains all nav links', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('/ai-engineering'));
    assert.ok(html.includes('/worldview'));
    assert.ok(html.includes('/contact'));
  });

  it('index.html contains footer element', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('<footer'));
  });

  it('index.html contains social links', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('linkedin'));
    assert.ok(html.includes('github'));
  });

  it('index.html contains hero split section', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('hero-split'));
  });

  it('index.html contains both CTAs', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('Read my thinking'));
    assert.ok(html.includes('Work with me'));
  });

  it('index.html contains social proof section', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    assert.ok(html.includes('social-proof'));
  });

  it('generates ai-engineering page', () => {
    assert.ok(existsSync('dist/ai-engineering/index.html'));
  });

  it('ai-engineering contains service blocks', () => {
    const html = readFileSync('dist/ai-engineering/index.html', 'utf-8');
    assert.ok(html.includes('Consulting'));
    assert.ok(html.includes('Integration'));
    assert.ok(html.includes('Training'));
  });

  it('generates data-transformations page', () => {
    assert.ok(existsSync('dist/data-transformations/index.html'));
  });

  it('generates worldview page', () => {
    assert.ok(existsSync('dist/worldview/index.html'));
  });

  it('worldview contains accordion sections', () => {
    const html = readFileSync('dist/worldview/index.html', 'utf-8');
    assert.ok(html.includes('libertarianism'));
    assert.ok(html.includes('growth-culture'));
    assert.ok(html.includes('cats'));
    assert.ok(html.includes('aria-expanded'));
  });

  it('generates leadership page', () => {
    assert.ok(existsSync('dist/leadership/index.html'));
  });

  it('generates investments page', () => {
    assert.ok(existsSync('dist/investments/index.html'));
  });

  it('investments page contains disclaimer', () => {
    const html = readFileSync('dist/investments/index.html', 'utf-8');
    assert.ok(html.includes('Past performance'));
  });

  it('generates contact page', () => {
    assert.ok(existsSync('dist/contact/index.html'));
  });

  it('contact page contains form with required fields', () => {
    const html = readFileSync('dist/contact/index.html', 'utf-8');
    assert.ok(html.includes('<form'));
    assert.ok(html.includes('formspree'));
    assert.ok(html.includes('name="name"'));
    assert.ok(html.includes('name="email"'));
  });

  it('generates 404 page', () => {
    assert.ok(existsSync('dist/404.html'));
  });
});
