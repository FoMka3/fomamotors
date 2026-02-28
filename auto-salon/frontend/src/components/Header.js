import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    Menu as MenuIcon,
    ShoppingCart as CartIcon,
    DirectionsCar as CarIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Отслеживаем скролл
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <AppBar 
            position="sticky"  // ← STICKY а не fixed!
            elevation={scrolled ? 4 : 0}
            sx={{
                backgroundColor: scrolled 
                    ? '#1E2A3A'  // При скролле - плотный синий
                    : 'rgba(30,42,58,0.7)', // Вверху - полупрозрачный синий
                backdropFilter: 'blur(10px)', // BLUR всегда
                transition: 'all 0.3s ease',
                boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : 'none'
            }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                    <MenuIcon />
                </IconButton>

                <CarIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        color: 'inherit',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        letterSpacing: 1
                    }}
                >
                    FOMA MOTORS
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        component={RouterLink}
                        to="/cars"
                        color="inherit"
                        sx={{ 
                            display: { xs: 'none', md: 'flex' },
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' }
                        }}
                    >
                        Автомобили
                    </Button>

                    <IconButton 
                        color="inherit"
                        component={RouterLink}
                        to="/cart"
                        sx={{ 
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' }
                        }}
                    >
                        <Badge badgeContent={cartCount} color="secondary">
                            <CartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem component={RouterLink} to="/" onClick={() => setAnchorEl(null)}>
                    Главная
                </MenuItem>
                <MenuItem component={RouterLink} to="/cars" onClick={() => setAnchorEl(null)}>
                    Каталог авто
                </MenuItem>
                <MenuItem component={RouterLink} to="/about" onClick={() => setAnchorEl(null)}>
                    О салоне
                </MenuItem>
                <MenuItem component={RouterLink} to="/contacts" onClick={() => setAnchorEl(null)}>
                    Контакты
                </MenuItem>
            </Menu>
        </AppBar>
    );
};

export default Header;