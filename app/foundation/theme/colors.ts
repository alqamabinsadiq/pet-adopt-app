export const colors = {
  // Primary colors from the image
  primary: '#FF6B5B', // Coral-orange background
  primaryLight: '#FF8A7A', // Lighter shade for patterns

  // Accent colors
  accentDark: '#333B5C', // Dark blue/purple for buttons
  accentPurple: '#8A4D9F', // Purple for FAB
  accentTeal: '#34C7D8', // Teal/light blue for FAB

  // Text colors
  textLight: '#FFFFFF', // White text on dark backgrounds
  textDark: '#000000', // Black text on light backgrounds
  textMuted: '#666666', // Muted text for descriptions

  // Background colors
  background: '#FFFFFF', // White background
  backgroundLight: '#F8F9FA', // Light gray background

  // Border and shadow colors
  border: '#E1E5E9',
  shadow: 'rgba(0, 0, 0, 0.1)',

  // Status colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
} as const;

export type ColorKey = keyof typeof colors;
