import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Divider,
    Alert,
    Snackbar,
    CardMedia
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import axios from 'axios';

// Список салонов в Москве
const SALONS = [
    {
        id: 1,
        name: 'FOMA MOTORS на Таганке',
        address: 'ул. Земляной Вал, 33, Москва',
        metro: 'Таганская',
        phone: '+7 (495) 123-45-67',
        hours: '10:00 - 21:00'
    },
    {
        id: 2,
        name: 'FOMA MOTORS на Ленинградском',
        address: 'Ленинградский пр-т, 45, Москва',
        metro: 'Динамо',
        phone: '+7 (495) 234-56-78',
        hours: '10:00 - 21:00'
    },
    {
        id: 3,
        name: 'FOMA MOTORS на Кутузовском',
        address: 'Кутузовский пр-т, 24, Москва',
        metro: 'Кутузовская',
        phone: '+7 (495) 345-67-89',
        hours: '10:00 - 21:00'
    },
    {
        id: 4,
        name: 'FOMA MOTORS на Варшавке',
        address: 'Варшавское шоссе, 87, Москва',
        metro: 'Варшавская',
        phone: '+7 (495) 456-78-90',
        hours: '10:00 - 21:00'
    }
];

// Функция форматирования телефона
const formatPhoneNumber = (value) => {
    if (!value) return '+7';
    
    // Удаляем всё кроме цифр
    const numbers = value.replace(/\D/g, '');
    
    // Если первая цифра 7 или 8, заменяем на +7
    let formatted = '+7';
    
    if (numbers.length > 1) {
        // Код оператора (3 цифры)
        if (numbers.length >= 2) {
            formatted += ' (' + numbers.substring(1, 4);
        }
        if (numbers.length >= 5) {
            formatted += ') ' + numbers.substring(4, 7);
        }
        if (numbers.length >= 8) {
            formatted += '-' + numbers.substring(7, 9);
        }
        if (numbers.length >= 10) {
            formatted += '-' + numbers.substring(9, 11);
        }
    }
    
    return formatted;
};

// Функция валидации телефона (должно быть 11 цифр после +7)
const isValidPhone = (phone) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 11 && (numbers[0] === '7' || numbers[0] === '8');
};

const Order = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '+7',
        email: '',
        selectedSalon: '1',
        comment: ''
    });

    const [errors, setErrors] = useState({});
    const [phoneError, setPhoneError] = useState('');

    // Загружаем корзину
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            navigate('/cars');
            showNotification('Корзина пуста', 'warning');
        }
        setCartItems(cart);
    }, [navigate, showNotification]);

    // Валидация
    const validateForm = () => {
        const newErrors = {};

        // Имя
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Введите имя';
        } else if (!/^[a-zA-Zа-яА-Я]{2,}$/.test(formData.firstName.trim())) {
            newErrors.firstName = 'Имя должно содержать только буквы (минимум 2)';
        }

        // Фамилия
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Введите фамилию';
        } else if (!/^[a-zA-Zа-яА-Я]{2,}$/.test(formData.lastName.trim())) {
            newErrors.lastName = 'Фамилия должна содержать только буквы (минимум 2)';
        }

        // Телефон
        if (!isValidPhone(formData.phone)) {
            newErrors.phone = 'Введите корректный номер из 11 цифр';
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Введите email';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }

        // Салон
        if (!formData.selectedSalon) {
            newErrors.selectedSalon = 'Выберите салон';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const formatted = formatPhoneNumber(value);
        setFormData(prev => ({ ...prev, phone: formatted }));
        
        // Проверка на корректность
        if (formatted.length > 2) {
            const numbers = formatted.replace(/\D/g, '');
            if (numbers.length < 11) {
                setPhoneError('Номер должен содержать 11 цифр');
            } else {
                setPhoneError('');
            }
        } else {
            setPhoneError('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Проверьте правильность заполнения полей', 'error');
            return;
        }

        setLoading(true);

        try {
            const selectedSalon = SALONS.find(s => s.id.toString() === formData.selectedSalon);

            const orderData = {
                customer_name: `${formData.lastName} ${formData.firstName}`,
                customer_email: formData.email,
                customer_phone: formData.phone,
                delivery_method: 'pickup',
                delivery_address: selectedSalon.address,
                delivery_city: 'Москва',
                comment: formData.comment,
                items: cartItems.map(item => ({
                    car_id: item.id,
                    car_name: item.name,
                    quantity: item.quantity || 1,
                    unit_price: item.price,
                    total_price: item.price * (item.quantity || 1)
                })),
                total_amount: cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
            };

            const response = await axios.post('/api/orders', orderData);
            
            if (response.data.success) {
                localStorage.removeItem('cart');
                showNotification('Заказ успешно оформлен!', 'success');
                setSnackbarMessage('Заказ успешно оформлен!');
                setSnackbarOpen(true);
                
                setTimeout(() => {
                    navigate('/order-success', { 
                        state: { orderId: response.data.order_id } 
                    });
                }, 2000);
            }
        } catch (error) {
            console.error('Ошибка оформления заказа:', error);
            showNotification('Ошибка при оформлении заказа', 'error');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(price);
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 3 }}>
                Оформление заказа
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Левая колонка - форма */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 3 }}>
                                1. Контактные данные
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Имя"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        required
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Фамилия"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        required
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Телефон"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        error={!!errors.phone}
                                        helperText={errors.phone || phoneError || '+7 (___) ___-__-__'}
                                        required
                                        size="small"
                                        placeholder="+7 (999) 999-99-99"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 3 }}>
                                2. Выберите салон для получения
                            </Typography>

                            <FormControl component="fieldset" error={!!errors.selectedSalon}>
                                <RadioGroup
                                    name="selectedSalon"
                                    value={formData.selectedSalon}
                                    onChange={handleChange}
                                >
                                    <Grid container spacing={2}>
                                        {SALONS.map((salon) => (
                                            <Grid item xs={12} key={salon.id}>
                                                <Paper 
                                                    variant="outlined" 
                                                    sx={{ 
                                                        p: 2,
                                                        borderColor: formData.selectedSalon === salon.id.toString() 
                                                            ? '#1E2A3A' 
                                                            : '#E0E0E0',
                                                        bgcolor: formData.selectedSalon === salon.id.toString() 
                                                            ? 'rgba(30,42,58,0.04)' 
                                                            : 'transparent'
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value={salon.id.toString()}
                                                        control={<Radio />}
                                                        label={
                                                            <Box>
                                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E2A3A' }}>
                                                                    {salon.name}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                                                    {salon.address}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
                                                                    <Typography variant="caption" sx={{ color: '#6F8F9F' }}>
                                                                        м. {salon.metro}
                                                                    </Typography>
                                                                    <Typography variant="caption" sx={{ color: '#6F8F9F' }}>
                                                                        {salon.phone}
                                                                    </Typography>
                                                                    <Typography variant="caption" sx={{ color: '#6F8F9F' }}>
                                                                        {salon.hours}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        }
                                                        sx={{ width: '100%', alignItems: 'flex-start' }}
                                                    />
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                                {errors.selectedSalon && (
                                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                                        {errors.selectedSalon}
                                    </Typography>
                                )}
                            </FormControl>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 3 }}>
                                3. Дополнительная информация
                            </Typography>

                            <TextField
                                fullWidth
                                label="Комментарий к заказу"
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                size="small"
                                placeholder="Напишите, если есть особые пожелания..."
                            />
                        </Paper>
                    </Grid>

                    {/* Правая колонка - заказ */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 2 }}>
                                Ваш заказ
                            </Typography>

                            {cartItems.map((item) => (
                                <Box key={item.id} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <CardMedia
                                            component="img"
                                            image={item.image || '/images/cars/placeholder-car.webp'}
                                            alt={item.name}
                                            sx={{ 
                                                width: 60,
                                                height: 60,
                                                borderRadius: 1,
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1E2A3A' }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#4A6572', display: 'block' }}>
                                                {item.quantity || 1} x {formatPrice(item.price)}
                                            </Typography>
                                        </Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1E2A3A' }}>
                                            {formatPrice(item.price * (item.quantity || 1))}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography sx={{ color: '#4A6572' }}>Сумма</Typography>
                                <Typography sx={{ fontWeight: 600, color: '#1E2A3A' }}>
                                    {formatPrice(totalPrice)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography sx={{ color: '#4A6572' }}>Получение</Typography>
                                <Typography sx={{ color: '#4A6572' }}>Бесплатно</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600 }}>
                                    Итого
                                </Typography>
                                <Typography variant="h5" sx={{ color: '#1E2A3A', fontWeight: 700 }}>
                                    {formatPrice(totalPrice)}
                                </Typography>
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#1E2A3A',
                                    py: 1.5,
                                    '&:hover': { backgroundColor: '#2C3E50' },
                                    '&.Mui-disabled': {
                                        backgroundColor: '#4A6572',
                                        opacity: 0.6
                                    }
                                }}
                            >
                                {loading ? 'Оформление...' : 'Подтвердить заказ'}
                            </Button>

                            <Typography variant="caption" sx={{ color: '#4A6572', display: 'block', textAlign: 'center', mt: 2 }}>
                                После подтверждения мы забронируем автомобиль для вас
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </form>

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

export default Order;