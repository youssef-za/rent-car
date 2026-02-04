import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Avatar,
    Tooltip,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { APP_CONSTANTS } from '../../utils/constants';

const Navbar = ({ handleDrawerToggle }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${APP_CONSTANTS.sidebarWidth}px)` },
                ml: { sm: `${APP_CONSTANTS.sidebarWidth}px` },
                backgroundColor: 'white',
                color: 'text.primary',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
            }}
        >
            <Toolbar>
                {/* Mobile menu button */}
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Page title */}
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Car Rental Management
                </Typography>

                {/* Right side actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Notifications">
                        <IconButton color="inherit">
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Account">
                        <IconButton color="inherit">
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                <AccountIcon />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
