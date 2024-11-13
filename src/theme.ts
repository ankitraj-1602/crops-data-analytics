import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    brand: [
      '#f0faff',
      '#e0f5ff',
      '#c0ebff',
      '#a0e1ff',
      '#80d7ff',
      '#60cdff',
      '#40c3ff',
      '#20b9ff',
      '#00afff',
      '#0095e6',
    ],
  },
  primaryColor: 'brand',
  fontFamily: 'Arial, sans-serif',
  headings: {
    fontFamily: 'Georgia, serif',
    sizes: {
      h1: { fontSize: '2.5rem' },
      h2: { fontSize: '2rem' },
      h3: { fontSize: '1.75rem' },
      h4: { fontSize: '1.5rem' },
      h5: { fontSize: '1.25rem' },
      h6: { fontSize: '1rem' },
    },
  },
  other: {
    borderRadius: '8px',
  },
});
