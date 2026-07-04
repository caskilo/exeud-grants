interface ExeudLogoProps {
  size?: number;
  className?: string;
  logoUrl?: string;
  brandColours?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

/**
 * Exeud Logo - An elegant, animated representation of growth and discovery.
 *
 * When `logoUrl` is provided, renders the hosted image instead of the SVG.
 * When `brandColours` are provided, the SVG gradients use those colours
 * instead of the default Exeud purple palette.
 */
export default function ExeudLogo({
  size = 40,
  className = '',
  logoUrl,
  brandColours,
}: ExeudLogoProps) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt="Organisation logo"
        width={size}
        height={size}
        className={className}
        style={{
          objectFit: 'contain',
          borderRadius: 4,
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  const cPrimary = brandColours?.primary || '#6C3BAA';
  const cSecondary = brandColours?.secondary || '#2D1B4E';
  const cAccent = brandColours?.accent || '#B388EB';
  const cLight = brandColours?.accent || '#D2B8F7';

  // Unique gradient IDs to avoid collisions when multiple logos are on the page
  const gid = `logo-${cPrimary.replace('#', '')}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      style={{ filter: `drop-shadow(0 2px 8px ${cPrimary}44)` }}
    >
      <defs>
        <radialGradient id={`${gid}-bloom`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={cLight} stopOpacity="1" />
          <stop offset="50%" stopColor={cPrimary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={cSecondary} stopOpacity="0.6" />
        </radialGradient>

        <linearGradient id={`${gid}-orbit`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={cAccent} stopOpacity="0.8" />
          <stop offset="100%" stopColor={cPrimary} stopOpacity="0.4" />
        </linearGradient>

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

      <circle
        cx="20" cy="20" r="16"
        fill="none"
        stroke={`url(#${gid}-orbit)`}
        strokeWidth="1"
        className="orbit-ring"
        opacity="0.5"
      />
      <circle
        cx="20" cy="20" r="11"
        fill="none"
        stroke={cPrimary}
        strokeWidth="0.8"
        className="orbit-ring"
        opacity="0.4"
        style={{ animationDelay: '0.5s' }}
      />
      <g className="orbit-dot">
        <circle cx="20" cy="4" r="1.5" fill={cAccent} />
        <circle cx="20" cy="36" r="1.5" fill={cPrimary} opacity="0.6" />
      </g>
      <g className="orbit-dot" style={{ animationDelay: '2.7s' }}>
        <circle cx="36" cy="20" r="1.5" fill={cPrimary} />
        <circle cx="4" cy="20" r="1.5" fill={cSecondary} opacity="0.6" />
      </g>
      <g className="central-bloom">
        <ellipse cx="20" cy="20" rx="7" ry="4" fill={`url(#${gid}-bloom)`} transform="rotate(0, 20, 20)" className="petal" style={{ animationDelay: '0s' }} />
        <ellipse cx="20" cy="20" rx="7" ry="4" fill={`url(#${gid}-bloom)`} transform="rotate(45, 20, 20)" className="petal" style={{ animationDelay: '0.25s' }} />
        <ellipse cx="20" cy="20" rx="7" ry="4" fill={`url(#${gid}-bloom)`} transform="rotate(90, 20, 20)" className="petal" style={{ animationDelay: '0.5s' }} />
        <ellipse cx="20" cy="20" rx="7" ry="4" fill={`url(#${gid}-bloom)`} transform="rotate(135, 20, 20)" className="petal" style={{ animationDelay: '0.75s' }} />
        <circle cx="20" cy="20" r="3" fill={cPrimary} opacity="0.9" />
        <circle cx="20" cy="20" r="1.5" fill={cLight} opacity="0.8" />
      </g>
      <line x1="20" y1="8" x2="20" y2="12" stroke={cAccent} strokeWidth="0.5" opacity="0.4" />
      <line x1="20" y1="28" x2="20" y2="32" stroke={cAccent} strokeWidth="0.5" opacity="0.4" />
      <line x1="8" y1="20" x2="12" y2="20" stroke={cAccent} strokeWidth="0.5" opacity="0.4" />
      <line x1="28" y1="20" x2="32" y2="20" stroke={cAccent} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
