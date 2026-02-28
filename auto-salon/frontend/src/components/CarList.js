import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import CarCard from './CarCard';
import { useCars } from '../context/CarContext';

const CarList = () => {
    const { cars, loading } = useCars();

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography>Загрузка автомобилей...</Typography>
            </Box>
        );
    }

    if (cars.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                    Автомобили не найдены
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Попробуйте изменить параметры фильтрации
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {cars.map((car) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
                    <CarCard car={car} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CarList;