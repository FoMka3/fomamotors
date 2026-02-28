import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { CheckCircle as CheckCircleIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId } = location.state || { orderId: 'Неизвестно' };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
                
                <Typography variant="h4" sx={{ color: '#1E2A3A', fontWeight: 600, mb: 2 }}>
                    Заказ успешно оформлен!
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#4A6572', mb: 1 }}>
                    Номер вашего заказа: <strong>{orderId}</strong>
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#4A6572', mb: 4 }}>
                    Мы забронировали автомобиль для вас. Ожидайте звонка менеджера для подтверждения.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                        component={RouterLink}
                        to="/cars"
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            backgroundColor: '#1E2A3A',
                            '&:hover': { backgroundColor: '#2C3E50' }
                        }}
                    >
                        Вернуться в каталог
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default OrderSuccess;