// Damped spring for travel; a pendulum suspended from the moving hanger rail.
// Units: carousel slots, seconds, radians. No React renders are needed per frame.
export const railOffset = (index, active, count) => {
  let offset = (index - active + count) % count;
  if (offset > count / 2) offset -= count;
  return offset;
};
export function advanceHanger(body, seconds) {
  const steps = Math.max(1, Math.ceil(seconds / (1 / 120)));
  const dt = Math.min(seconds, .04) / steps;
  for (let i = 0; i < steps; i++) {
    const acceleration = 80 * (body.target - body.x) - 16 * body.velocity;
    body.velocity += acceleration * dt;
    body.x += body.velocity * dt;
    const angularAcceleration = -(18 / body.length) * Math.sin(body.angle)
      - 2.8 * body.angularVelocity - (acceleration * .16 / body.length) * Math.cos(body.angle);
    body.angularVelocity += angularAcceleration * dt;
    body.angle += body.angularVelocity * dt;
    if (Math.abs(body.angle) > .26) {
      body.angle = Math.sign(body.angle) * .26;
      body.angularVelocity *= .4;
    }
  }
  const settled = Math.abs(body.x - body.target) < .0005 && Math.abs(body.velocity) < .002
    && Math.abs(body.angle) < .0005 && Math.abs(body.angularVelocity) < .002;
  if (settled) { body.x = body.target; body.velocity = 0; body.angle = 0; body.angularVelocity = 0; }
  return !settled;
}
