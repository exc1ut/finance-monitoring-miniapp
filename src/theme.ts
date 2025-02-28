import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  primaryShade: 6,
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '600',
  },
  components: {
    Paper: {
      defaultProps: {
        shadow: 'xs',
      },
    },
    Container: {
      defaultProps: {
        size: 'sm',
      },
    },
    Card: {
      defaultProps: {
        withBorder: true,
        shadow: 'sm',
      },
    },
    Title: {
      styles: {
        root: {
          '&:where([data-order="1"])': {
            fontSize: rem(28),
          },
          '&:where([data-order="2"])': {
            fontSize: rem(22),
          },
          '&:where([data-order="3"])': {
            fontSize: rem(18),
          },
        },
      },
    },
  },
  other: {
    colors: {
      incomeGreen: '#4d8b6c',
      expenseRed: '#9e4a59',
    },
    dayHeaderBg: 'var(--mantine-color-dark-6)',
  },
});
