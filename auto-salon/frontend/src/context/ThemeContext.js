import React, { createContext, useContext, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // ФИКСИРОВАННАЯ СВЕТЛАЯ ТЕМА - НИКАКИХ ПЕРЕКЛЮЧАТЕЛЕЙ
    const theme = useMemo(() => createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#1E2A3A',      // тёмно-синий
                light: '#2C3E50',
                dark: '#0F1A2A',
                contrastText: '#FFFFFF',
            },
            secondary: {
                main: '#4A6572',      // серо-голубой
                light: '#6F8F9F',
                dark: '#2F4B5C',
                contrastText: '#FFFFFF',
            },
            background: {
                default: '#F5F7FA',     // светлый серый фон
                paper: '#FFFFFF',
                light: '#F0F2F5',
            },
            text: {
                primary: '#1E2A3A',
                secondary: '#4A6572',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: { fontWeight: 700 },
            h2: { fontWeight: 600 },
            h3: { fontWeight: 600 },
            button: {
                textTransform: 'none',
                fontWeight: 500,
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        textTransform: 'none',
                        fontWeight: 500,
                        padding: '6px 12px',
                        minWidth: 'auto',
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        boxShadow: '0 2px 8px rgba(30,42,58,0.08)',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#1E2A3A',
                    },
                },
            },
        },
    }), []);

    return (
        <ThemeContext.Provider value={{}}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};