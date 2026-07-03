// PLACEHOLDER — Exeud Brand Colors (not confirmed against real brand assets;
// derived from organisation-defaults.ts placeholder palette). Replace with
// Exeud's actual brand colours once available.
export const BRAND_COLORS = {
  // Primary brand colors
  exeud: '#2D1B4E', // Core deep purple
  grain: '#0c3a29',    // Kept as a secondary accent; rename/replace as needed
  white: '#FFFFFF',    // Pure white
  
  // Extended palette derived from brand colors
  strategic: '#6C3BAA', // Medium purple
  flourishing: '#27AE60', // Light green
  neutral: '#95A5A6', // Neutral gray
  authority: '#2C3E50', // Dark gray for text
} as const;

// Color families for Mantine theme
export const COLOR_FAMILIES = {
  exeud: ['#2D1B4E', '#6C3BAA', '#8E5FC2', '#B388EB', '#D2B8F7'],
  grain: ['#0c3a29', '#27AE60', '#7D8A2E', '#87A96B', '#ABEBC6'],
  authority: ['#2D1B4E', '#6C3BAA', '#2C3E50', '#34495E', '#17202A'],
  flourishing: ['#0c3a29', '#27AE60', '#7D8A2E', '#229954', '#1E8449'],
  strategic: ['#6C3BAA', '#8E5FC2', '#B388EB', '#4B2A80', '#3A1F63'],
  neutral: ['#95A5A6', '#BDC3C7', '#D5DBDB', '#E5E7E9', '#F8F9FA'],
} as const;

// Semantic color mappings
export const SEMANTIC_COLORS = {
  primary: 'exeud',
  success: 'grain',
  warning: 'strategic',
  error: 'authority',
  info: 'exeud',
} as const;

export default BRAND_COLORS;
