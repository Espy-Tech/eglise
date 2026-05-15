/**
 * Configuration constants and color palette for the Numerical Integration Platform
 */

export const APP_CONFIG = {
  name: "Numerical Integration Platform",
  version: "1.0.0",
  description: "Premium Scientific Platform for Numerical Integration Analysis",
  author: "Scientific Computing Team",
  year: new Date().getFullYear(),
};

/**
 * Color Palette - Premium Blue & Tech Theme
 */
export const COLORS = {
  primary: "#0066FF",
  primaryLight: "#E6F0FF",
  primaryDark: "#0052CC",
  secondary: "#00D9FF",
  secondaryLight: "#E0F7FF",
  secondaryDark: "#00A8CC",
  accent: "#FF6B35",
  accentLight: "#FFE5D9",
  accentDark: "#CC5428",
  background: "#FFFFFF",
  surface: "#F5F7FA",
  surfaceAlt: "#EBF0F7",
  border: "#D4DFE8",
  text: "#1A1F3A",
  textSecondary: "#6B7A8F",
  textTertiary: "#9BA8B8",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  gradientPrimary: "linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)",
  gradientAccent: "linear-gradient(135deg, #FF6B35 0%, #FF9F43 100%)",
  gradientDark: "linear-gradient(135deg, #1A1F3A 0%, #0052CC 100%)",
};

export const TYPOGRAPHY = {
  h1: "3.5rem",
  h2: "2.75rem",
  h3: "2.25rem",
  h4: "1.875rem",
  h5: "1.5rem",
  h6: "1.25rem",
  body: "1rem",
  small: "0.875rem",
  xs: "0.75rem",
};

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
  "4xl": "4rem",
};

export const BORDER_RADIUS = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "1rem",
  xl: "1.5rem",
  full: "9999px",
};

export const SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
};

export const BREAKPOINTS = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const ANIMATIONS = {
  fast: "150ms",
  base: "250ms",
  slow: "350ms",
  slower: "500ms",
};

export const EASING = {
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
};

export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
};

export const INTEGRATION_CONFIG = {
  DEFAULT_INTERVALS: 1000,
  MIN_INTERVALS: 10,
  MAX_INTERVALS: 10000,
  STEP_INTERVALS: 10,
  DEFAULT_A: 0,
  DEFAULT_B: Math.PI,
  MIN_BOUND: -100,
  MAX_BOUND: 100,
  DEFAULT_METHOD: "rectangle",
  PRECISION_DECIMALS: 6,
};

export const CHART_CONFIG = {
  colors: [COLORS.primary, COLORS.secondary, COLORS.accent],
  height: 400,
  margin: { top: 20, right: 30, left: 20, bottom: 20 },
};

export const MESSAGES = {
  success: "Operation completed successfully",
  error: "An error occurred. Please try again.",
  loading: "Loading...",
  empty: "No data available",
};