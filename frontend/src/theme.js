import { createTheme } from '@mui/material/styles';

/**
 * BizQ design system — "Book it" world.
 * Warm off-white ground, near-black ink, one trust-green accent.
 * Display: Bricolage Grotesque. UI / body: Figtree.
 * Fonts are loaded via <link> in index.html.
 */

const DISPLAY_STACK =
  '"Bricolage Grotesque", "Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const BODY_STACK =
  '"Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';

export const tokens = {
  green: '#1f6f5c',
  greenDark: '#185a4a',
  greenSoft: '#e3f0ec',
  ink: '#1e1b16',
  inkSoft: '#544e44',
  muted: '#5f5d55',
  faint: '#6b685f', // AA on the warm ground for small text
  ground: '#fbfaf6',
  paper: '#ffffff',
  line: '#e8e4db',
  fieldFill: '#f5f3ee',
  // px strings — use directly in `sx`, where a bare number would be
  // multiplied by theme.shape.borderRadius.
  radius: { sm: '10px', md: '12px', lg: '16px', pill: '999px' },
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.green, dark: tokens.greenDark, contrastText: '#ffffff' },
    text: { primary: tokens.ink, secondary: tokens.muted },
    background: { default: tokens.ground, paper: tokens.paper },
    divider: tokens.line,
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: BODY_STACK,
    h1: { fontFamily: DISPLAY_STACK, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.06 },
    h2: { fontFamily: DISPLAY_STACK, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.12 },
    h3: { fontFamily: DISPLAY_STACK, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.18 },
    h4: { fontFamily: DISPLAY_STACK, fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontFamily: DISPLAY_STACK, fontWeight: 700 },
    h6: { fontFamily: DISPLAY_STACK, fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: '0' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, paddingInline: 18 },
        containedPrimary: {
          '&:hover': { backgroundColor: tokens.greenDark },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 16 } },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: { root: { color: tokens.green } },
    },
  },
});

export default theme;
