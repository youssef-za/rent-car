import { createTheme } from '@mui/material/styles';
import { COLORS, TYPOGRAPHY } from '../utils/constants';

const theme = createTheme({
    palette: {
        primary: {
            main: COLORS.primary.main,
            light: COLORS.primary.light,
            dark: COLORS.primary.dark,
            contrastText: COLORS.primary.contrastText,
        },
        secondary: {
            main: COLORS.secondary.main,
            light: COLORS.secondary.light,
            dark: COLORS.secondary.dark,
            contrastText: COLORS.secondary.contrastText,
        },
        success: {
            main: COLORS.success.main,
            light: COLORS.success.light,
            dark: COLORS.success.dark,
        },
        error: {
            main: COLORS.error.main,
            light: COLORS.error.light,
            dark: COLORS.error.dark,
        },
        warning: {
            main: COLORS.warning.main,
            light: COLORS.warning.light,
            dark: COLORS.warning.dark,
        },
        info: {
            main: COLORS.info.main,
            light: COLORS.info.light,
            dark: COLORS.info.dark,
        },
        background: {
            default: COLORS.background.default,
            paper: COLORS.background.paper,
        },
        text: {
            primary: COLORS.text.primary,
            secondary: COLORS.text.secondary,
            disabled: COLORS.text.disabled,
        },
    },

    typography: {
        fontFamily: TYPOGRAPHY.fontFamily.primary,
        h1: {
            fontFamily: TYPOGRAPHY.fontFamily.secondary,
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: TYPOGRAPHY.fontFamily.secondary,
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontFamily: TYPOGRAPHY.fontFamily.secondary,
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.4,
        },
        h4: {
            fontFamily: TYPOGRAPHY.fontFamily.secondary,
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h5: {
            fontFamily: TYPOGRAPHY.fontFamily.secondary,
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        h6: {
            fontFamily: TYPOGRAPHY.fontFamily.secondary,
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },

    shape: {
        borderRadius: 8,
    },

    shadows: [
        'none',
        '0px 2px 4px rgba(0,0,0,0.05)',
        '0px 4px 8px rgba(0,0,0,0.08)',
        '0px 8px 16px rgba(0,0,0,0.1)',
        '0px 12px 24px rgba(0,0,0,0.12)',
        '0px 16px 32px rgba(0,0,0,0.14)',
        '0px 20px 40px rgba(0,0,0,0.16)',
        '0px 24px 48px rgba(0,0,0,0.18)',
        '0px 2px 4px rgba(0,0,0,0.05)',
        '0px 4px 8px rgba(0,0,0,0.08)',
        '0px 8px 16px rgba(0,0,0,0.1)',
        '0px 12px 24px rgba(0,0,0,0.12)',
        '0px 16px 32px rgba(0,0,0,0.14)',
        '0px 20px 40px rgba(0,0,0,0.16)',
        '0px 24px 48px rgba(0,0,0,0.18)',
        '0px 2px 4px rgba(0,0,0,0.05)',
        '0px 4px 8px rgba(0,0,0,0.08)',
        '0px 8px 16px rgba(0,0,0,0.1)',
        '0px 12px 24px rgba(0,0,0,0.12)',
        '0px 16px 32px rgba(0,0,0,0.14)',
        '0px 20px 40px rgba(0,0,0,0.16)',
        '0px 24px 48px rgba(0,0,0,0.18)',
        '0px 2px 4px rgba(0,0,0,0.05)',
        '0px 4px 8px rgba(0,0,0,0.08)',
        '0px 8px 16px rgba(0,0,0,0.1)',
    ],

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                    fontSize: '0.95rem',
                },
                contained: {
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                        boxShadow: '0px 6px 16px rgba(0,0,0,0.15)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
                elevation1: {
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.06)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: 'none',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
                },
            },
        },
    },
});

export default theme;
