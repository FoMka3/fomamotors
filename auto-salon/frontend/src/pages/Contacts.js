import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Card,
    CardContent,
    Divider,
    Button,
    IconButton
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    AccessTime as TimeIcon,
    Telegram as TelegramIcon,
    WhatsApp as WhatsAppIcon,
    Instagram as InstagramIcon,
    DirectionsCar as CarIcon
} from '@mui/icons-material';

const Contacts = () => {
    const salons = [
        {
            name: 'FOMA MOTORS на Таганке',
            address: 'ул. Земляной Вал, 33, Москва',
            metro: 'Таганская',
            phone: '+7 (495) 123-45-67',
            email: 'taganka@autosalon.ru',
            hours: '10:00 - 21:00'
        },
        {
            name: 'FOMA MOTORS на Ленинградском',
            address: 'Ленинградский пр-т, 45, Москва',
            metro: 'Динамо',
            phone: '+7 (495) 234-56-78',
            email: 'leningradsky@autosalon.ru',
            hours: '10:00 - 21:00'
        },
        {
            name: 'FOMA MOTORS на Кутузовском',
            address: 'Кутузовский пр-т, 24, Москва',
            metro: 'Кутузовская',
            phone: '+7 (495) 345-67-89',
            email: 'kutuzovsky@autosalon.ru',
            hours: '10:00 - 21:00'
        },
        {
            name: 'FOMA MOTORS на Варшавке',
            address: 'Варшавское шоссе, 87, Москва',
            metro: 'Варшавская',
            phone: '+7 (495) 456-78-90',
            email: 'varshavka@autosalon.ru',
            hours: '10:00 - 21:00'
        }
    ];

    const socials = [
        { name: 'Telegram', icon: <TelegramIcon />, link: 'https://t.me/autosalon', color: '#0088cc' },
        { name: 'WhatsApp', icon: <WhatsAppIcon />, link: 'https://wa.me/74951234567', color: '#25D366' },
        { name: 'Instagram', icon: <InstagramIcon />, link: 'https://instagram.com/autosalon', color: '#E4405F' }
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
                        Контакты
                    </Typography>
                    <Typography variant="h5" align="center" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
                        Свяжитесь с нами любым удобным способом
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Контактная информация */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2 }}>
                            <PhoneIcon sx={{ fontSize: 48, color: '#1E2A3A', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 1 }}>
                                Телефон
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#4A6572', mb: 1 }}>
                                +7 (495) 123-45-67
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6F8F9F' }}>
                                Ежедневно с 10:00 до 21:00
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2 }}>
                            <EmailIcon sx={{ fontSize: 48, color: '#1E2A3A', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 1 }}>
                                Email
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#4A6572' }}>
                                info@autosalon.ru
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6F8F9F' }}>
                                Ответим в течение часа
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2 }}>
                            <LocationIcon sx={{ fontSize: 48, color: '#1E2A3A', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 1 }}>
                                4 салона в Москве
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#4A6572' }}>
                                Все салоны рядом с метро
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6F8F9F' }}>
                                Выберите удобный
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Социальные сети */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 3 }}>
                        Мы в социальных сетях
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        {socials.map((social, index) => (
                            <IconButton
                                key={index}
                                href={social.link}
                                target="_blank"
                                sx={{
                                    bgcolor: social.color,
                                    color: 'white',
                                    width: 56,
                                    height: 56,
                                    '&:hover': {
                                        bgcolor: social.color,
                                        opacity: 0.9,
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.2s'
                                }}
                            >
                                {social.icon}
                            </IconButton>
                        ))}
                    </Box>
                </Box>

                {/* Салоны - БЕЗ КАРТИНОК */}
                <Typography variant="h4" align="center" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 4 }}>
                    Наши салоны
                </Typography>

                <Grid container spacing={4}>
                    {salons.map((salon, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card sx={{ borderRadius: 2, height: '100%' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h5" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 2 }}>
                                        {salon.name}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        <LocationIcon sx={{ color: '#1E2A3A', fontSize: 20 }} />
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                                {salon.address}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#6F8F9F' }}>
                                                м. {salon.metro}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        <PhoneIcon sx={{ color: '#1E2A3A', fontSize: 20 }} />
                                        <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                            {salon.phone}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        <EmailIcon sx={{ color: '#1E2A3A', fontSize: 20 }} />
                                        <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                            {salon.email}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                        <TimeIcon sx={{ color: '#1E2A3A', fontSize: 20 }} />
                                        <Typography variant="body2" sx={{ color: '#4A6572' }}>
                                            {salon.hours}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{ 
                                            borderColor: '#1E2A3A',
                                            color: '#1E2A3A',
                                            '&:hover': {
                                                borderColor: '#2C3E50',
                                                backgroundColor: 'rgba(30,42,58,0.05)'
                                            }
                                        }}
                                    >
                                        Как проехать
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Реквизиты */}
                <Paper sx={{ mt: 6, p: 4, borderRadius: 2, bgcolor: '#F5F7FA' }}>
                    <Typography variant="h5" align="center" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 3 }}>
                        Реквизиты компании
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={8}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography sx={{ color: '#4A6572' }}>ООО "АВТО САЛОН"</Typography>
                                <Typography sx={{ color: '#1E2A3A', fontWeight: 500 }}>ИНН 7712345678</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography sx={{ color: '#4A6572' }}>КПП 771201001</Typography>
                                <Typography sx={{ color: '#1E2A3A', fontWeight: 500 }}>ОГРН 1157746123456</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#4A6572' }}>Юридический адрес:</Typography>
                                <Typography sx={{ color: '#1E2A3A', fontWeight: 500, textAlign: 'right' }}>
                                    г. Москва, ул. Земляной Вал, д. 33
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default Contacts;