import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    IconButton,
    Drawer,
    Button,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { FilterList as FilterIcon } from '@mui/icons-material';
import { CarProvider, useCars } from '../context/CarContext';
import CarList from '../components/CarList';
import SearchAndFilterBar from '../components/SearchAndFilterBar';
import FiltersModal from '../components/FiltersModal';

const CarsContent = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const { cars } = useCars();

    return (
        <Box sx={{ py: 3 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ color: '#1E2A3A', fontWeight: 600 }}>
                        Каталог автомобилей
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4A6572' }}>
                        Найдено: {cars.length}
                    </Typography>
                </Box>

                <SearchAndFilterBar onFilterClick={() => setFilterOpen(true)} />

                <CarList />

                {/* Модалка с фильтрами вместо боковой панели */}
                <FiltersModal
                    open={filterOpen}
                    onClose={() => setFilterOpen(false)}
                />
            </Container>
        </Box>
    );
};

const Cars = () => {
    return (
        <CarProvider>
            <CarsContent />
        </CarProvider>
    );
};

export default Cars;