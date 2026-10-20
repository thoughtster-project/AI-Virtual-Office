import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Verify Master Template deliverable exists and has no "(Restored Design)"', () => {
  const html = fs.readFileSync('index.html', 'utf-8');
  assert.ok(html.includes('Virtual Office Live View'));
  assert.ok(!html.includes('(Restored Design)'), 'Must remove "(Restored Design)"');
});

test('Verify HERMES CORE STATUS has circuit processor icon', () => {
  const html = fs.readFileSync('index.html', 'utf-8');
  assert.ok(html.includes('HERMES CORE STATUS'));
  // Verify chip processor pins SVG
  assert.ok(html.includes('M9 1v4M15 1v4M9 19v4M15 19v4'));
});

test('Verify Agent Skills Registry covers agents', () => {
  const html = fs.readFileSync('index.html', 'utf-8');
  assert.ok(html.includes('AGENT_SKILLS'));
  assert.ok(html.includes('Prismatic Overdrive'));
  assert.ok(html.includes('Priority Dispatch'));
  assert.ok(html.includes('Cluster Nexus'));
  assert.ok(html.includes('Viral Content Blueprint'));
});

test('Verify 3D Brain simulation and Albert Hologram are integrated', () => {
  const html = fs.readFileSync('index.html', 'utf-8');
  assert.ok(html.includes('albert-removebg-preview.png'));
  assert.ok(html.includes('buildCerebralHemisphere'));
  assert.ok(html.includes('createElectricTrunkLine'));
  assert.ok(html.includes('node-aura-hub'));
  assert.ok(html.includes('node-aura-tamkoa'));
  assert.ok(html.includes('node-aura-tumkao'));
});

test('Verify Character Set 2 assets are loaded without gaps', () => {
  const html = fs.readFileSync('index.html', 'utf-8');
  assert.ok(html.includes('Character Set2.jpg'));
  assert.ok(fs.existsSync('public/Character Set2.jpg'));
  assert.ok(fs.existsSync('public/albert-removebg-preview.png'));
});
