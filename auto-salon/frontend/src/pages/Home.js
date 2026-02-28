import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Snackbar,
    Alert,
    Chip,
    Avatar,
    Divider,
    useTheme,
    alpha
} from '@mui/material';
import {
    DirectionsCar as CarIcon,
    Security as SecurityIcon,
    SupportAgent as SupportIcon,
    TrendingUp as TrendingIcon,
    ArrowForward as ArrowForwardIcon,
    AddShoppingCart as AddCartIcon,
    LocationOn as LocationIcon,
    Verified as VerifiedIcon,
    History as HistoryIcon,
    Speed as SpeedIcon,
    Phone as PhoneIcon,
    Star as StarIcon,
    CheckCircle as CheckCircleIcon,
    Timeline as TimelineIcon,
    Groups as GroupsIcon,
    EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useNotification } from '../context/NotificationContext';

const Home = () => {
    const [popularCars, setPopularCars] = useState([]);
    const [premiumCars, setPremiumCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { showNotification } = useNotification();
    const theme = useTheme();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('/api/cars');
                const allCars = response.data.data || [];
                
                // Первые 4 - популярные
                setPopularCars(allCars.slice(0, 4));
                
                // Следующие 4 - премиум
                setPremiumCars(allCars.slice(4, 8));
            } catch (error) {
                console.error('Ошибка загрузки автомобилей:', error);
                // Заглушки
                const mockCars = [
                    { id: 1, name: 'BMW X5', price: 8500000, year: 2022, engine_type: 'бензин', power: 340, image: '/images/cars/bmw-x5.webp', brand_name: 'BMW', in_stock: true },
                    { id: 2, name: 'Mercedes C63', price: 9500000, year: 2023, engine_type: 'бензин', power: 510, image: '/images/cars/mercedes-c63.webp', brand_name: 'Mercedes', in_stock: true },
                    { id: 3, name: 'Audi RS6', price: 11000000, year: 2022, engine_type: 'бензин', power: 600, image: '/images/cars/audi-rs6.webp', brand_name: 'Audi', in_stock: true },
                    { id: 4, name: 'Porsche 911', price: 15000000, year: 2023, engine_type: 'бензин', power: 450, image: '/images/cars/porsche-911.webp', brand_name: 'Porsche', in_stock: true },
                    { id: 5, name: 'Range Rover Sport', price: 12500000, year: 2022, engine_type: 'дизель', power: 560, image: '/images/cars/rangerover.webp', brand_name: 'Range Rover', in_stock: true },
                    { id: 6, name: 'Porsche Cayenne', price: 11000000, year: 2023, engine_type: 'бензин', power: 550, image: '/images/cars/cayenne.webp', brand_name: 'Porsche', in_stock: true },
                    { id: 7, name: 'Bentley Continental', price: 22000000, year: 2022, engine_type: 'бензин', power: 650, image: '/images/cars/bentley.webp', brand_name: 'Bentley', in_stock: true },
                    { id: 8, name: 'Maserati Levante', price: 13500000, year: 2023, engine_type: 'бензин', power: 580, image: '/images/cars/maserati.webp', brand_name: 'Maserati', in_stock: true }
                ];
                setPopularCars(mockCars.slice(0, 4));
                setPremiumCars(mockCars.slice(4, 8));
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    // Статистика (вместо преимуществ)
    const stats = [
        { value: '500+', label: 'Авто в наличии', icon: <CarIcon />, color: '#1E2A3A' },
        { value: '8 лет', label: 'На рынке', icon: <TimelineIcon />, color: '#2C3E50' },
        { value: '3000+', label: 'Клиентов', icon: <GroupsIcon />, color: '#4A6572' },
        { value: '100%', label: 'Проверка', icon: <VerifiedIcon />, color: '#2F4B5C' }
    ];

    // Услуги
    const services = [
        {
            icon: <VerifiedIcon sx={{ fontSize: 48 }} />,
            title: 'Полная диагностика',
            description: 'Проверка двигателя, ходовой, электрики и компьютерная диагностика'
        },
        {
            icon: <HistoryIcon sx={{ fontSize: 48 }} />,
            title: 'История авто',
            description: 'Отчет по базам ГИБДД, проверка на залоги и ДТП'
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 48 }} />,
            title: 'Тест-драйв',
            description: 'Любой автомобиль можно протестировать перед покупкой'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 48 }} />,
            title: 'Юридическая помощь',
            description: 'Поможем с оформлением и проверкой документов'
        }
    ];

    // Акции
    const offers = [
        {
            title: 'Trade-in',
            description: 'Обменяйте ваш автомобиль с доплатой',
            discount: 'Выгода до 500 000 ₽',
            color: '#1E2A3A'
        },
        {
            title: 'Кредит 0%',
            description: 'Специальное предложение на премиум авто',
            discount: 'Первоначальный взнос 20%',
            color: '#2C3E50'
        },
        {
            title: 'Страховка в подарок',
            description: 'При покупке любого автомобиля',
            discount: 'КАСКО бесплатно',
            color: '#4A6572'
        }
    ];

    // Салоны (кратко)
    const salons = [
        { name: 'Таганка', address: 'ул. Земляной Вал, 33', metro: 'Таганская' },
        { name: 'Ленинградский', address: 'Ленинградский пр-т, 45', metro: 'Динамо' }
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleAddToCart = (car) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find(item => item.id === car.id);
        
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({
                id: car.id,
                name: car.name,
                price: car.price,
                image: car.image,
                year: car.year,
                power: car.power,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification(`${car.name} добавлен в корзину`, 'success');
        setSnackbarMessage(`${car.name} добавлен в корзину`);
        setSnackbarOpen(true);
    };

    return (
        <Box>
    {/* HERO - на всю ширину, текст по центру, без фото */}
    <Box sx={{ 
    position: 'relative',
    color: 'white',
    overflow: 'hidden',
    py: { xs: 8, md: 12 },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/images/hero-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.7)', // затемнение чтобы текст читался
        zIndex: 1
    }
}}>
    {/* Затемняющий слой (можно убрать если картинка сама норм) */}
    <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0,0,0,0.4)', // полупрозрачный черный для читаемости
        zIndex: 2
    }} />
    
    <Container maxWidth="md" sx={{ 
        textAlign: 'center',
        position: 'relative',
        zIndex: 3
    }}>
        <Chip 
            label="Премиум автосалон" 
            sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                mb: 3,
                fontWeight: 500,
                fontSize: '1rem',
                py: 2,
                px: 3
            }} 
        />
        <Typography variant="h1" sx={{ 
            fontWeight: 800, 
            fontSize: { xs: '3.5rem', md: '5rem' },
            lineHeight: 1.1,
            mb: 2,
            letterSpacing: '-0.02em',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
            FOMA MOTORS
        </Typography>
        <Typography variant="h4" sx={{ 
            fontWeight: 400, 
            opacity: 0.95,
            mb: 3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
        }}>
            Автомобили с проверенной историей
        </Typography>
        <Typography variant="body1" sx={{ 
            opacity: 0.95, 
            mb: 5,
            fontSize: '1.2rem',
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6,
            textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
        }}>
            Более 500 автомобилей в наличии. Полная диагностика, 
            юридическая проверка и помощь в выборе.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
                component={RouterLink}
                to="/cars"
                variant="contained"
                size="large"
                sx={{
                    bgcolor: 'white',
                    color: '#1E2A3A',
                    px: 5,
                    py: 1.8,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    '&:hover': {
                        bgcolor: '#f0f0f0'
                    }
                }}
            >
                Смотреть авто
            </Button>
            <Button
                component={RouterLink}
                to="/contacts"
                variant="outlined"
                size="large"
                sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 5,
                    py: 1.8,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)'
                    }
                }}
            >
                Салоны
            </Button>
            </Box>
        </Container>
    </Box>


            {/* СТАТИСТИКА - цифры вместо преимуществ */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Paper 
                                elevation={0}
                                sx={{ 
                                    p: 3, 
                                    textAlign: 'center',
                                    bgcolor: alpha(stat.color, 0.05),
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(stat.color, 0.1)}`
                                }}
                            >
                                <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
                                <Typography variant="h3" sx={{ color: stat.color, fontWeight: 700 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#4A6572' }}>
                                    {stat.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* ПОПУЛЯРНЫЕ АВТО - горизонтальный скролл на мобилках? нет, просто сетка */}
            <Box sx={{ bgcolor: '#F5F7FA', py: 6 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Box>
                            <Typography variant="h3" sx={{ color: '#1E2A3A', fontWeight: 700 }}>
                                Популярные авто
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#4A6572' }}>
                                Самые востребованные модели
                            </Typography>
                        </Box>
                        <Button
                            component={RouterLink}
                            to="/cars"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ color: '#1E2A3A' }}
                        >
                            Все авто
                        </Button>
                    </Box>

                    <Grid container spacing={3}>
                        {popularCars.map((car) => (
                            <Grid item xs={12} sm={6} md={3} key={car.id}>
                                <Card sx={{ 
                                    borderRadius: 2,
                                    position: 'relative',
                                    '&:hover': {
                                        boxShadow: 8
                                    }
                                }}>
                                    {!car.in_stock && (
                                        <Chip
                                            label="Нет в наличии"
                                            color="error"
                                            size="small"
                                            sx={{ 
                                                position: 'absolute', 
                                                top: 10, 
                                                right: 10, 
                                                zIndex: 1 
                                            }}
                                        />
                                    )}
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={car.image || '/images/cars/placeholder-car.webp'}
                                        alt={car.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }} noWrap>
                                            {car.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                            <Chip label={car.year} size="small" variant="outlined" />
                                            <Chip label={`${car.power} л.с.`} size="small" variant="outlined" />
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 700 }}>
                                                {formatPrice(car.price)}
                                            </Typography>
                                            <Button
                                                onClick={() => handleAddToCart(car)}
                                                variant="contained"
                                                size="small"
                                                disabled={!car.in_stock}
                                                sx={{ 
                                                    borderRadius: 4,
                                                    bgcolor: '#1E2A3A'
                                                }}
                                            >
                                                <AddCartIcon />
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* УСЛУГИ - блок с иконками */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h3" align="center" sx={{ color: '#1E2A3A', fontWeight: 700, mb: 2 }}>
                    Наши услуги
                </Typography>
                <Typography variant="h6" align="center" sx={{ color: '#4A6572', mb: 6, fontWeight: 400 }}>
                    Полный спектр услуг при покупке автомобиля
                </Typography>

                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ 
                                    color: '#1E2A3A', 
                                    mb: 2,
                                    display: 'inline-block',
                                    p: 2,
                                    borderRadius: '50%',
                                    bgcolor: alpha('#1E2A3A', 0.05)
                                }}>
                                    {service.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {service.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                    {service.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* АКЦИИ И СПЕЦПРЕДЛОЖЕНИЯ */}
            <Box sx={{ bgcolor: '#F5F7FA', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" align="center" sx={{ color: '#1E2A3A', fontWeight: 700, mb: 4 }}>
                        Спецпредложения
                    </Typography>

                    <Grid container spacing={3}>
                        {offers.map((offer, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Paper 
                                    sx={{ 
                                        p: 4,
                                        bgcolor: offer.color,
                                        color: 'white',
                                        borderRadius: 2,
                                        height: '100%',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)'
                                        }
                                    }}
                                >
                                    <EmojiEventsIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                        {offer.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                                        {offer.description}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.95 }}>
                                        {offer.discount}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ПРЕМИУМ АВТО - отдельный ряд */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h3" sx={{ color: '#1E2A3A', fontWeight: 700 }}>
                            Премиум класс
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#4A6572' }}>
                            Эксклюзивные автомобили
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    {premiumCars.map((car) => (
                        <Grid item xs={12} sm={6} md={3} key={car.id}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={car.image || '/images/cars/placeholder-car.webp'}
                                    alt={car.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }} noWrap>
                                        {car.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#4A6572', mb: 2 }}>
                                        {car.year} • {car.power} л.с.
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 700 }}>
                                            {formatPrice(car.price)}
                                        </Typography>
                                        <Button
                                            onClick={() => handleAddToCart(car)}
                                            variant="contained"
                                            size="small"
                                            sx={{ 
                                                borderRadius: 4,
                                                bgcolor: '#1E2A3A'
                                            }}
                                        >
                                            <AddCartIcon />
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* САЛОНЫ - минималистично */}
            <Box sx={{ bgcolor: '#1E2A3A', color: 'white', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 4 }}>
                        Наши салоны
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {salons.map((salon, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Paper 
                                    sx={{ 
                                        p: 3, 
                                        bgcolor: alpha('#FFFFFF', 0.1),
                                        backdropFilter: 'blur(10px)',
                                        color: 'white'
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                                        {salon.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                                        <LocationIcon />
                                        <Box>
                                            <Typography>{salon.address}</Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                м. {salon.metro}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button
                                        component={RouterLink}
                                        to="/contacts"
                                        sx={{ 
                                            mt: 2, 
                                            color: 'white',
                                            borderColor: 'white',
                                            '&:hover': {
                                                borderColor: 'white',
                                                bgcolor: alpha('#FFFFFF', 0.1)
                                            }
                                        }}
                                        variant="outlined"
                                    >
                                        Подробнее
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA БАННЕР */}
            <Box sx={{ py: 6, bgcolor: '#F5F7FA' }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ color: '#1E2A3A', fontWeight: 700, mb: 2 }}>
                        Не нашли подходящий автомобиль?
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#4A6572', mb: 4, fontWeight: 400 }}>
                        Оставьте заявку, и мы подберем для вас идеальный вариант
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/contacts"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#1E2A3A',
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            '&:hover': { bgcolor: '#2C3E50' }
                        }}
                    >
                        Связаться с нами
                    </Button>
                </Container>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Home;