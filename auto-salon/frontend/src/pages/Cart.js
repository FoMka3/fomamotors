import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    CardMedia,
    Button,
    IconButton,
    Paper,
    Divider,
    Alert,
    Snackbar
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as CartIcon,
    ArrowBack as ArrowBackIcon,
    DirectionsCar as CarIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { showNotification } = useNotification();

    // Загружаем корзину из localStorage
    useEffect(() => {
        const loadCart = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            // Объединяем одинаковые товары
            const mergedCart = cart.reduce((acc, item) => {
                const existing = acc.find(i => i.id === item.id);
                if (existing) {
                    existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
                } else {
                    acc.push({ ...item, quantity: item.quantity || 1 });
                }
                return acc;
            }, []);
            setCartItems(mergedCart);
        };
        loadCart();
    }, []);

    // Сохраняем корзину
    const saveCart = (items) => {
        localStorage.setItem('cart', JSON.stringify(items));
        setCartItems(items);
    };

    // Изменение количества
    const updateQuantity = (id, delta) => {
        const newCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = (item.quantity || 1) + delta;
                if (newQuantity >= 1) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        }).filter(item => (item.quantity || 1) >= 1);
        
        saveCart(newCart);
        showNotification('Количество обновлено', 'info');
    };

    // Удаление товара
    const removeItem = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        saveCart(newCart);
        showNotification('Автомобиль удален из корзины', 'warning');
    };

    // Очистка корзины
    const clearCart = () => {
        saveCart([]);
        showNotification('Корзина очищена', 'info');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(price);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    if (cartItems.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CarIcon sx={{ fontSize: 80, color: '#4A6572', mb: 2 }} />
                    <Typography variant="h4" gutterBottom sx={{ color: '#1E2A3A', fontWeight: 600 }}>
                        Корзина пуста
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4A6572', mb: 4 }}>
                        Добавьте автомобили в корзину, чтобы оформить заказ
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/cars"
                        variant="contained"
                        size="large"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            backgroundColor: '#1E2A3A',
                            '&:hover': { backgroundColor: '#2C3E50' }
                        }}
                    >
                        Перейти в каталог
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 3 }}>
                Корзина ({totalItems} {totalItems === 1 ? 'автомобиль' : 'автомобилей'})
            </Typography>

            <Grid container spacing={3}>
                {/* Список автомобилей */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                        {cartItems.map((item, index) => (
                            <Box key={item.id}>
                                {index > 0 && <Divider sx={{ my: 2 }} />}
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4} sm={3}>
                                        <CardMedia
                                            component="img"
                                            image={item.image || '/images/cars/placeholder-car.webp'}
                                            alt={item.name}
                                            sx={{ 
                                                width: '100%',
                                                height: 'auto',
                                                borderRadius: 1
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={8} sm={9}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E2A3A' }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#4A6572', mb: 1 }}>
                                                    {item.year} • {item.engine_type} • {item.power} л.с.
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E2A3A' }}>
                                                    {formatPrice(item.price)}
                                                </Typography>
                                            </Box>
                                            <IconButton 
                                                onClick={() => removeItem(item.id)}
                                                size="small"
                                                sx={{ color: '#d32f2f' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    sx={{ 
                                                        border: '1px solid #4A6572',
                                                        borderRadius: 1,
                                                        p: 0.5
                                                    }}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 500 }}>
                                                    {item.quantity || 1}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    sx={{ 
                                                        border: '1px solid #4A6572',
                                                        borderRadius: 1,
                                                        p: 0.5
                                                    }}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E2A3A' }}>
                                                {formatPrice(item.price * (item.quantity || 1))}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                onClick={clearCart}
                                variant="outlined"
                                size="small"
                                sx={{ 
                                    borderColor: '#d32f2f',
                                    color: '#d32f2f',
                                    '&:hover': {
                                        borderColor: '#b71c1c',
                                        backgroundColor: 'rgba(211,47,47,0.05)'
                                    }
                                }}
                            >
                                Очистить корзину
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Итоговая сумма */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
                        <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 2 }}>
                            Итого
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography sx={{ color: '#4A6572' }}>Автомобили ({totalItems})</Typography>
                            <Typography sx={{ color: '#1E2A3A', fontWeight: 500 }}>{formatPrice(totalPrice)}</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography sx={{ color: '#4A6572' }}>Доставка</Typography>
                            <Typography sx={{ color: '#4A6572' }}>Бесплатно</Typography>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600 }}>К оплате</Typography>
                            <Typography variant="h5" sx={{ color: '#1E2A3A', fontWeight: 700 }}>
                                {formatPrice(totalPrice)}
                            </Typography>
                        </Box>

                        <Button
                            component={RouterLink}
                            to="/order"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                backgroundColor: '#1E2A3A',
                                py: 1.5,
                                '&:hover': { backgroundColor: '#2C3E50' }
                            }}
                        >
                            Оформить заказ
                        </Button>
                        
                        <Button
                            component={RouterLink}
                            to="/cars"
                            fullWidth
                            sx={{ mt: 1, color: '#4A6572' }}
                        >
                            Продолжить покупки
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Cart;