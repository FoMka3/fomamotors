import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    LocalGasStation as GasIcon,
    Speed as SpeedIcon,
    Settings as SettingsIcon,
    AddShoppingCart as AddCartIcon
} from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';

const CarCard = ({ car }) => {
    const [open, setOpen] = useState(false);
    const { showNotification } = useNotification();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === car.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                id: car.id,
                name: car.name,
                price: car.price,
                image: car.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification(`${car.name} добавлен в корзину`, 'success');
        setOpen(true);
    };

    return (
        <>
            <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                position: 'relative',
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(30,42,58,0.15)'
                }
            }}>
                {!car.in_stock && (
                    <Chip
                        label="Нет в наличии"
                        color="error"
                        size="small"
                        sx={{ 
                            position: 'absolute', 
                            top: 8, 
                            right: 8, 
                            zIndex: 1,
                            fontWeight: 500,
                            height: 22,
                            fontSize: '0.7rem'
                        }}
                    />
                )}
                
                <CardMedia
                    component="img"
                    height="160"
                    image={car.image || '/images/cars/placeholder-car.webp'}
                    alt={car.name}
                    sx={{ 
                        objectFit: 'cover',
                    }}
                />
                
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography 
                        variant="subtitle1" 
                        component="h3" 
                        sx={{ 
                            fontWeight: 600,
                            color: '#1E2A3A',
                            mb: 0.5,
                            fontSize: '1rem'
                        }}
                        noWrap
                    >
                        {car.name}
                    </Typography>
                    
                    <Typography variant="caption" sx={{ color: '#4A6572', display: 'block', mb: 1 }}>
                        {car.year} • {car.power} л.с.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
                        <Chip
                            icon={<GasIcon sx={{ fontSize: '0.8rem' }} />}
                            label={`${car.engine_capacity || 2.0}L`}
                            size="small"
                            variant="outlined"
                            sx={{ 
                                borderColor: '#1E2A3A',
                                color: '#4A6572',
                                height: 22,
                                '& .MuiChip-icon': { color: '#1E2A3A', fontSize: '0.8rem' }
                            }}
                        />
                        <Chip
                            icon={<SettingsIcon sx={{ fontSize: '0.8rem' }} />}
                            label={car.transmission || 'автомат'}
                            size="small"
                            variant="outlined"
                            sx={{ 
                                borderColor: '#1E2A3A',
                                color: '#4A6572',
                                height: 22,
                                '& .MuiChip-icon': { color: '#1E2A3A', fontSize: '0.8rem' }
                            }}
                        />
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mt: 1
                    }}>
                        <Typography variant="subtitle1" sx={{ 
                            color: '#1E2A3A', 
                            fontWeight: 700,
                            fontSize: '1rem'
                        }}>
                            {formatPrice(car.price)}
                        </Typography>
                        <Button
                            onClick={handleAddToCart}
                            variant="contained"
                            size="small"
                            startIcon={<AddCartIcon sx={{ fontSize: '1rem' }} />}
                            disabled={!car.in_stock}
                            sx={{ 
                                borderRadius: 4,
                                px: 1.5,
                                py: 0.5,
                                fontSize: '0.75rem',
                                minWidth: 0,
                                backgroundColor: '#1E2A3A',
                                '&:hover': { backgroundColor: '#2C3E50' }
                            }}
                        >
                            В корзину
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Товар добавлен в корзину
                </Alert>
            </Snackbar>
        </>
    );
};

export default CarCard;