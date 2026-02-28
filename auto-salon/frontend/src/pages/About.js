import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Avatar,
    Divider,
    Card,
    CardContent,
    CardMedia
} from '@mui/material';
import {
    DirectionsCar as CarIcon,
    EmojiPeople as PeopleIcon,
    ThumbUp as ThumbUpIcon,
    Verified as VerifiedIcon,
    Timeline as TimelineIcon,
    Star as StarIcon
} from '@mui/icons-material';

const About = () => {
    const stats = [
        { value: '500+', label: 'Автомобилей в наличии', icon: <CarIcon /> },
        { value: '8 лет', label: 'На рынке', icon: <TimelineIcon /> },
        { value: '3000+', label: 'Довольных клиентов', icon: <PeopleIcon /> },
        { value: '100%', label: 'Проверка истории', icon: <VerifiedIcon /> }
    ];

    const values = [
        {
            title: 'Качество',
            description: 'Мы предлагаем только автомобили с проверенной историей и прозрачным прошлым.',
            icon: <ThumbUpIcon sx={{ fontSize: 40 }} />
        },
        {
            title: 'Надёжность',
            description: 'Каждый автомобиль проходит техническую диагностику перед продажей.',
            icon: <VerifiedIcon sx={{ fontSize: 40 }} />
        },
        {
            title: 'Клиенты',
            description: 'Наши клиенты возвращаются к нам и рекомендуют нас друзьям и знакомым.',
            icon: <PeopleIcon sx={{ fontSize: 40 }} />
        }
    ];

    return (
        <Box>
            {/* Hero секция */}
            <Box
                sx={{
                    bgcolor: '#1E2A3A',
                    color: 'white',
                    py: 6,
                    mb: 4
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h2" align="center" sx={{ fontWeight: 700, mb: 2 }}>
                        О компании
                    </Typography>
                    <Typography variant="h5" align="center" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
                        AUTO SALON — ваш надёжный партнёр в мире премиальных автомобилей
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Статистика */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Paper
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4
                                    }
                                }}
                            >
                                <Box sx={{ color: '#1E2A3A', mb: 1 }}>{stat.icon}</Box>
                                <Typography variant="h4" sx={{ color: '#1E2A3A', fontWeight: 700 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                    {stat.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Описание */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 2 }}>
                            Кто мы?
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#4A6572', fontSize: '1.1rem' }}>
                            FOMA MOTORS — это современный автомобильный салон, специализирующийся на продаже 
                            премиальных автомобилей с пробегом. Мы работаем с 2016 года и за это время помогли 
                            тысячам клиентов найти автомобиль своей мечты.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#4A6572', fontSize: '1.1rem' }}>
                            Наша миссия — сделать процесс покупки автомобиля максимально прозрачным, комфортным 
                            и безопасным. Мы тщательно проверяем каждый автомобиль, предоставляем полную историю 
                            и гарантируем юридическую чистоту.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="https://placehold.co/600x400/1E2A3A/FFFFFF?text=Auto+Salon"
                            alt="FOMA MOTORS"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Ценности */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" align="center" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 4 }}>
                        Наши ценности
                    </Typography>
                    <Grid container spacing={4}>
                        {values.map((value, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card sx={{ 
                                    height: '100%',
                                    borderRadius: 2,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4
                                    }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                        <Box sx={{ color: '#1E2A3A', mb: 2 }}>{value.icon}</Box>
                                        <Typography variant="h5" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 2 }}>
                                            {value.title}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: '#4A6572' }}>
                                            {value.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Преимущества */}
                <Paper sx={{ p: 4, borderRadius: 2, bgcolor: '#F5F7FA' }}>
                    <Typography variant="h4" align="center" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 3 }}>
                        Почему выбирают нас?
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <StarIcon sx={{ color: '#1E2A3A' }} />
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600 }}>
                                        Полная проверка истории
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                        Мы проверяем каждый автомобиль по базам ГИБДД, кредитным историям и сервисным книжкам.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <StarIcon sx={{ color: '#1E2A3A' }} />
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600 }}>
                                        Техническая диагностика
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                        Перед продажей каждый автомобиль проходит полную техническую диагностику.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <StarIcon sx={{ color: '#1E2A3A' }} />
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600 }}>
                                        Юридическая гарантия
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                        Мы гарантируем юридическую чистоту и помогаем с оформлением.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <StarIcon sx={{ color: '#1E2A3A' }} />
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600 }}>
                                        Тест-драйв
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                        Вы можете протестировать любой автомобиль перед покупкой.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default About;