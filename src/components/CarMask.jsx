import { useState, useEffect } from 'react';

export default function CarMask() {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { w, h } = vp;

  // 1.2:1 aspect — sedan front is closer to square than widescreen
  const cw = Math.min(w * 0.90, h * 0.55);
  const ch = cw / 1.20;
  const cx = w / 2;
  const cy = h / 2;

  const px = (f) => cx + cw * f;
  const py = (f) => cy + ch * f;
  const pt = (fx, fy) => `${px(fx)},${py(fy)}`;

  // ── Outer body silhouette ──────────────────────────────────────
  // Proportions (% of half-extents):
  //   Roof y=-0.50, windshield base y=0.00 (≈43% of total height)
  //   Headlights y=0.05–0.30, bumper y=0.30–0.52
  const body = [
    `M${pt(-0.24, -0.50)}`,
    `Q${pt(0, -0.58)} ${pt(0.24, -0.50)}`,   // roof arch
    `L${pt(0.36, -0.30)}`,                     // right A-pillar upper
    `L${pt(0.46, 0.00)}`,                      // right A-pillar base
    `L${pt(0.50, 0.05)}`,                      // right body start
    `L${pt(0.50, 0.30)}`,                      // right body lower
    `L${pt(0.48, 0.40)}`,                      // right bumper shoulder
    `L${pt(0.44, 0.48)}`,
    `L${pt(0.28, 0.50)}`,
    `L${pt(0, 0.52)}`,
    `L${pt(-0.28, 0.50)}`,
    `L${pt(-0.44, 0.48)}`,
    `L${pt(-0.48, 0.40)}`,
    `L${pt(-0.50, 0.30)}`,
    `L${pt(-0.50, 0.05)}`,
    `L${pt(-0.46, 0.00)}`,
    `L${pt(-0.36, -0.30)}`,
    'Z',
  ].join(' ');

  const overlay = `M0,0 H${w} V${h} H0 Z ${body}`;

  // ── Windshield (large — ~43% of car height) ──
  const windshield = [
    `M${pt(-0.22, -0.46)}`,
    `L${pt(0.22, -0.46)}`,
    `L${pt(0.44, 0.00)}`,
    `L${pt(-0.44, 0.00)}`,
    'Z',
  ].join(' ');

  // ── Headlights (angular — inner top angled upward) ──
  const hlL = [
    `M${pt(-0.50, 0.05)}`,
    `L${pt(-0.22, -0.03)}`,
    `L${pt(-0.22, 0.30)}`,
    `L${pt(-0.50, 0.30)}`,
    'Z',
  ].join(' ');

  const hlR = [
    `M${pt(0.50, 0.05)}`,
    `L${pt(0.22, -0.03)}`,
    `L${pt(0.22, 0.30)}`,
    `L${pt(0.50, 0.30)}`,
    'Z',
  ].join(' ');

  // ── Side mirrors ──
  const mirL = [
    `M${pt(-0.36, -0.28)}`,
    `L${pt(-0.46, -0.24)}`,
    `L${pt(-0.46, -0.14)}`,
    `L${pt(-0.36, -0.17)}`,
    'Z',
  ].join(' ');

  const mirR = [
    `M${pt(0.36, -0.28)}`,
    `L${pt(0.46, -0.24)}`,
    `L${pt(0.46, -0.14)}`,
    `L${pt(0.36, -0.17)}`,
    'Z',
  ].join(' ');

  const sw = Math.max(1.5, cw * 0.0050);
  const sc = 'rgba(255,255,255,0.82)';
  const sc2 = 'rgba(255,255,255,0.52)';

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      {/* Dark outside, clear car interior */}
      <path fillRule="evenodd" fill="rgba(0,0,0,0.50)" d={overlay} />

      {/* Car outer border */}
      <path fill="none" stroke={sc} strokeWidth={sw} d={body} />

      {/* Windshield */}
      <path fill="none" stroke={sc} strokeWidth={sw} d={windshield} />

      {/* Headlights */}
      <path fill="none" stroke={sc} strokeWidth={sw} d={hlL} />
      <path fill="none" stroke={sc} strokeWidth={sw} d={hlR} />

      {/* Headlight / bumper separator */}
      <line stroke={sc2} strokeWidth={sw * 0.65}
        x1={px(-0.50)} y1={py(0.30)} x2={px(0.50)} y2={py(0.30)} />

      {/* Grille lines (3×) */}
      {[0.37, 0.43, 0.49].map((dy, i) => (
        <line key={i} stroke={sc} strokeWidth={sw * 0.85}
          x1={px(-0.22)} y1={py(dy)} x2={px(0.22)} y2={py(dy)} />
      ))}

      {/* Lower corner fog lights */}
      <rect fill="none" stroke={sc2} strokeWidth={sw * 0.65} rx={2}
        x={px(-0.48)} y={py(0.36)} width={cw * 0.13} height={ch * 0.13} />
      <rect fill="none" stroke={sc2} strokeWidth={sw * 0.65} rx={2}
        x={px(0.35)} y={py(0.36)} width={cw * 0.13} height={ch * 0.13} />

      {/* Side mirrors */}
      <path fill="none" stroke={sc} strokeWidth={sw} d={mirL} />
      <path fill="none" stroke={sc} strokeWidth={sw} d={mirR} />
    </svg>
  );
}
