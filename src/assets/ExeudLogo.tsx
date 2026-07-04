interface ExeudLogoProps {
  size?: number;
  className?: string;
}

/**
 * Exeud Logo - An elegant, animated representation of growth and discovery
 * Features:
 * - Central bloom representing flourishing opportunities
 * - Orbiting elements symbolizing discovery and connection
 * - Dynamic animations for visual interest
 * - Uses Exeud purple palette
 */
export default function ExeudLogo({ size = 40, className = '' }: ExeudLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      style={{ filter: 'drop-shadow(0 2px 8px rgba(108, 59, 170, 0.3))' }}
    >
      <defs>
        {/* Gradient for the central bloom */}
        <radialGradient id="bloomGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D2B8F7" stopOpacity="1" />
          <stop offset="50%" stopColor="#8E5FC2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4B2A80" stopOpacity="0.6" />
        </radialGradient>

        {/* Gradient for orbit rings */}
        <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B388EB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6C3BAA" stopOpacity="0.4" />
        </linearGradient>

        {/* Animation for orbit pulse */}
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 0.6; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.05); }
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-2px); }
            }
            @keyframes shimmer {
              0% { stop-opacity: 0.6; }
              50% { stop-opacity: 1; }
              100% { stop-opacity: 0.6; }
            }
            .orbit-ring {
              animation: pulse 3s ease-in-out infinite;
              transform-origin: center;
            }
            .orbit-dot {
              animation: rotate 8s linear infinite;
              transform-origin: 20px 20px;
            }
            .central-bloom {
              animation: float 4s ease-in-out infinite;
            }
            .petal {
              animation: shimmer 2s ease-in-out infinite;
            }
          `}
        </style>
      </defs>

      {/* Outer orbit ring */}
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke="url(#orbitGradient)"
        strokeWidth="1"
        className="orbit-ring"
        opacity="0.5"
      />

      {/* Inner orbit ring */}
      <circle
        cx="20"
        cy="20"
        r="11"
        fill="none"
        stroke="#8E5FC2"
        strokeWidth="0.8"
        className="orbit-ring"
        opacity="0.4"
        style={{ animationDelay: '0.5s' }}
      />

      {/* Orbiting dots - representing discovery */}
      <g className="orbit-dot">
        <circle cx="20" cy="4" r="1.5" fill="#B388EB" />
        <circle cx="20" cy="36" r="1.5" fill="#6C3BAA" opacity="0.6" />
      </g>
      <g className="orbit-dot" style={{ animationDelay: '2.7s' }}>
        <circle cx="36" cy="20" r="1.5" fill="#8E5FC2" />
        <circle cx="4" cy="20" r="1.5" fill="#4B2A80" opacity="0.6" />
      </g>

      {/* Central bloom - representing flourishing opportunities */}
      <g className="central-bloom">
        {/* Petals */}
        <ellipse
          cx="20"
          cy="20"
          rx="7"
          ry="4"
          fill="url(#bloomGradient)"
          transform="rotate(0, 20, 20)"
          className="petal"
          style={{ animationDelay: '0s' }}
        />
        <ellipse
          cx="20"
          cy="20"
          rx="7"
          ry="4"
          fill="url(#bloomGradient)"
          transform="rotate(45, 20, 20)"
          className="petal"
          style={{ animationDelay: '0.25s' }}
        />
        <ellipse
          cx="20"
          cy="20"
          rx="7"
          ry="4"
          fill="url(#bloomGradient)"
          transform="rotate(90, 20, 20)"
          className="petal"
          style={{ animationDelay: '0.5s' }}
        />
        <ellipse
          cx="20"
          cy="20"
          rx="7"
          ry="4"
          fill="url(#bloomGradient)"
          transform="rotate(135, 20, 20)"
          className="petal"
          style={{ animationDelay: '0.75s' }}
        />

        {/* Core */}
        <circle cx="20" cy="20" r="3" fill="#6C3BAA" opacity="0.9" />
        <circle cx="20" cy="20" r="1.5" fill="#D2B8F7" opacity="0.8" />
      </g>

      {/* Subtle accent lines */}
      <line
        x1="20"
        y1="8"
        x2="20"
        y2="12"
        stroke="#B388EB"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <line
        x1="20"
        y1="28"
        x2="20"
        y2="32"
        stroke="#B388EB"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <line
        x1="8"
        y1="20"
        x2="12"
        y2="20"
        stroke="#B388EB"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <line
        x1="28"
        y1="20"
        x2="32"
        y2="20"
        stroke="#B388EB"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  );
}
