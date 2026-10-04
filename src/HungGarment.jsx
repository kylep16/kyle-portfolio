import { useId } from 'react';

// Fits are measured against each transparent catalog crop. Clothing and hardware
// share one coordinate system so resizing never separates a collar or waistband.
const FITS = {
  'nds-sweats-02-gray': { width: 296, height: 350, center: .508, clips: [.35, .665] },
  'nds-sweats-02-black': { width: 262, height: 350, center: .46, clips: [.28, .64] },
  'nds-sweats-01-v2': { width: 257, height: 350, center: .44, clips: [.27, .61] },
  'nds-exp-03-belt-pants': { width: 238, height: 350, center: .48, clips: [.23, .69], clipY: 98 },
  'nds-exp-04-bl-vessel': { width: 310, height: 281, center: .46, neck: 38 },
  'nds-exp-04-wh-vessel': { width: 310, height: 276, center: .475, neck: 38 },
  'nds-exp-02-canvas-jacket-navy': { width: 310, height: 264, center: .47, neck: 22 },
  'nds-exp-02-canvas-lace-jacket-black': { width: 310, height: 263, center: .51, neck: 22 },
};

function Clip({ x, y, metal }) {
  return <g className="hanger-clip" transform={`translate(${x} ${y})`}>
    <path d="M-9-23Q-9-33 0-34Q9-33 9-23L7 9Q0 14-7 9Z" fill={metal} stroke="#6c7373" strokeWidth="1" />
    <path d="M-5-23Q-5-29 0-29Q5-29 5-23V-14H-5Z" fill="#f0f2ef" stroke="#969d9a" />
    <path d="M-5-11H5M-5-8H5M0-14V3" stroke="#6c7470" strokeWidth="1.2" />
    <rect x="-8" y="2" width="16" height="13" rx="3" fill="#303634" />
    <path d="M-5 5H5" stroke="#727977" strokeWidth="1" />
  </g>;
}

export default function HungGarment({ product }) {
  const uid = useId();
  const metal = `url(#${uid}-metal)`;
  const shoulder = `${uid}-shoulder`;
  const fit = FITS[product.id];
  const pants = product.hanger === 'clip';
  const x = 160 - fit.width * fit.center;
  const y = pants ? 60 : 58;
  const clipY = (fit.clipY || 92) - 24;
  const clips = fit.clips?.map(position => x + position * fit.width);
  const shoulderShape = 'M160 34Q156 36 152 40L75 83Q69 89 81 89H239Q251 89 245 83L168 40Q164 36 160 34Z';
  const hookShape = 'M160 35V27C160 22 172 22 172 15C172 5 158 4 153 13';
  return <svg className="rail-outfit" viewBox="0 0 320 460" role="img" aria-labelledby={`${uid}-title`} data-material="steel">
    <title id={`${uid}-title`}>{product.catalogName} on a steel {pants ? 'clip' : 'shoulder'} hanger</title>
    <defs>
      <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#626c69" /><stop offset=".3" stopColor="#f5f7f4" /><stop offset=".55" stopColor="#939c98" /><stop offset=".8" stopColor="#f1f3ee" /><stop offset="1" stopColor="#6b7470" /></linearGradient>
      <g id={shoulder} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={shoulderShape} stroke={metal} strokeWidth="5" />
        <path d={shoulderShape} stroke="#eef2ef" strokeWidth="1.2" opacity=".8" />
      </g>
      {!pants && <clipPath id={`${uid}-neck`}><path d={`M${160 - fit.neck} 32H${160 + fit.neck}V60Q160 79 ${160 - fit.neck} 60Z`} /></clipPath>}
    </defs>
    <g data-layer="behind">
      {pants ? <path d={`M${clips[0] - 19} ${clipY - 8}H${clips[1] + 19}M160 35V${clipY - 8}`} fill="none" stroke={metal} strokeWidth="5" strokeLinecap="round" /> : <use href={`#${shoulder}`} />}
    </g>
    <image className="rail-garment-image" href={product.image} x={x} y={y} width={fit.width} height={fit.height} preserveAspectRatio="none" />
    <g className="hanger-front" data-layer="front">
      {!pants && <use href={`#${shoulder}`} clipPath={`url(#${uid}-neck)`} />}
      <path d={hookShape} fill="none" stroke="#727c77" strokeWidth="3.2" strokeLinecap="round" />
      <path d={hookShape} fill="none" stroke="#e5e9e2" strokeWidth="1.2" strokeLinecap="round" />
      {pants && clips.map((position, index) => <Clip key={index} x={position} y={clipY} metal={metal} />)}
    </g>
  </svg>;
}
