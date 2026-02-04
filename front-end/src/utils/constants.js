// Branding Configuration for DriveHub - Car Rental Management System

export const BRANDING = {
    appName: 'DriveHub',
    tagline: 'Professional Car Rental Management',
    company: 'DriveHub Solutions',

    // Logo configuration (text-based)
    logo: {
        text: 'DriveHub',
        icon: '🚗', // Can be replaced with custom SVG
        style: 'modern' // modern, classic, minimal
    }
};

// Professional Color Palette
export const COLORS = {
    // Primary - Professional Blue
    primary: {
        main: '#1976d2',      // Corporate blue
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#ffffff'
    },

    // Secondary - Energetic Orange
    secondary: {
        main: '#ff9800',      // Vibrant orange
        light: '#ffb74d',
        dark: '#f57c00',
        contrastText: '#000000'
    },

    // Success - Green
    success: {
        main: '#4caf50',
        light: '#81c784',
        dark: '#388e3c'
    },

    // Error - Red
    error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f'
    },

    // Warning - Amber
    warning: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00'
    },

    // Info - Light Blue
    info: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2'
    },

    // Neutral colors
    background: {
        default: '#f5f7fa',
        paper: '#ffffff',
        dark: '#1a1a2e'
    },

    text: {
        primary: '#2c3e50',
        secondary: '#546e7a',
        disabled: '#9e9e9e'
    }
};

// Typography Configuration
export const TYPOGRAPHY = {
    fontFamily: {
        primary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        secondary: '"Poppins", "Roboto", sans-serif',
        monospace: '"Fira Code", "Courier New", monospace'
    },

    // Recommended Google Fonts to import
    googleFonts: [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
    ]
};

// Application Constants
export const APP_CONSTANTS = {
    sidebarWidth: 260,
    navbarHeight: 64,

    // Table pagination
    rowsPerPageOptions: [5, 10, 25, 50],
    defaultRowsPerPage: 10,

    // Animation durations (ms)
    transitions: {
        fast: 200,
        normal: 300,
        slow: 500
    }
};

// Status badges configuration
export const CAR_STATUS = {
    available: {
        label: 'Available',
        color: 'success',
        icon: '✓'
    },
    rented: {
        label: 'Rented',
        color: 'error',
        icon: '✗'
    }
};

export default {
    BRANDING,
    COLORS,
    TYPOGRAPHY,
    APP_CONSTANTS,
    CAR_STATUS
};
