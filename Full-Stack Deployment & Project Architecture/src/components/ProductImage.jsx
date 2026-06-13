// Lightweight, zero-network-cost product imagery.
// Each product renders as a generative SVG using its accent color,
// avoiding image downloads entirely while keeping a distinct visual per item.
export default function ProductImage({ color = '#8FA68E', name = '' }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?'

  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={name}>
      <rect width="400" height="500" fill="#F0EBE1" />
      <circle cx="200" cy="210" r="130" fill={color} opacity="0.18" />
      <path
        d="M200 90 C260 130 285 220 200 320 C115 220 140 130 200 90 Z"
        fill={color}
        opacity="0.85"
      />
      <line x1="200" y1="100" x2="200" y2="305" stroke="#1A1F1A" strokeWidth="2" opacity="0.25" />
      <text
        x="200"
        y="430"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="28"
        fill="#1A1F1A"
        opacity="0.5"
      >
        {initial}
      </text>
    </svg>
  )
}
