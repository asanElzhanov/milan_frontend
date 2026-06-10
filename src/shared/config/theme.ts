export const theme = {
  colors: {
    saraWhite: '#fcfbf9',
    saraBeige: '#f4eee6',
    saraBeigeDark: '#d8cbbc',
    saraBronze: '#a37c56',
    saraGraphite: '#2b2b2b',
    saraBlack: '#1a1a1a',
  },
  fonts: {
    sans: 'Inter',
    fashion: 'Playfair Display',
  },
  radii: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
  },
  layout: {
    maxWidth: '1440px',
    desktopPadding: '80px',
    mobilePadding: '20px',
  },
} as const;

export type SaraTheme = typeof theme;
