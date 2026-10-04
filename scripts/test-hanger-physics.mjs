import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceHanger, railOffset } from '../src/hangerPhysics.js';
const body = overrides => ({ x:0, target:1, velocity:0, angle:0, angularVelocity:0, length:1, ...overrides });

test('travel drives a bounded swing, then both settle at the new hanger position', () => {
  const state=body(); let peak=0; let moving=true;
  for(let i=0;i<900;i++){moving=advanceHanger(state,1/60);peak=Math.max(peak,Math.abs(state.angle));}
  assert(peak>.02 && peak<=.26);
  assert.equal(moving,false);assert.equal(state.x,1);assert.equal(state.angle,0);
});
test('the simulation stays consistent across common display frame rates', () => {
  const states=[30,60,120].map(rate=>{const state=body();for(let i=0;i<rate;i++)advanceHanger(state,1/rate);return state;});
  for(const state of states){assert(Math.abs(state.x-states[0].x)<.015);assert(Math.abs(state.angle-states[0].angle)<.015);}
});
test('a pointer impulse swings a stationary hanger and loses energy', () => {
  const state=body({target:0,angularVelocity:1});let peak=0;
  for(let i=0;i<900;i++){advanceHanger(state,1/60);peak=Math.max(peak,Math.abs(state.angle));}
  assert(peak>.05);assert.equal(state.x,0);assert.equal(state.angle,0);
});
test('circular offsets keep one selected garment and wrap outside the foreground', () => {
  for(let active=0;active<8;active++) {
    const offsets=Array.from({length:8},(_,i)=>railOffset(i,active,8));
    assert.equal(offsets.filter(x=>x===0).length,1);assert.equal(offsets[active],0);
    assert(offsets.every(x=>x>=-3&&x<=4));
  }
  assert.equal(railOffset(7,0,8),-1);assert.equal(railOffset(0,7,8),1);
});
