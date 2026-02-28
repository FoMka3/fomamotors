import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Chip
} from '@mui/material';
import { useCars } from '../context/CarContext';

const FiltersModal = ({ open, onClose }) => {
    const { filters, updateFilter, resetFilters, brands, categories } = useCars();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Фильтры</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                    {/* Бренд */}
                    <FormControl fullWidth>
                        <InputLabel>Бренд</InputLabel>
                        <Select
                            value={filters.brand_id || ''}
                            onChange={(e) => updateFilter('brand_id', e.target.value)}
                            label="Бренд"
                        >
                            <MenuItem value="">Все бренды</MenuItem>
                            {brands.map(brand => (
                                <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Категория */}
                    <FormControl fullWidth>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            value={filters.category_id || ''}
                            onChange={(e) => updateFilter('category_id', e.target.value)}
                            label="Категория"
                        >
                            <MenuItem value="">Все категории</MenuItem>
                            {categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Цена */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Цена от"
                            type="number"
                            value={filters.min_price || ''}
                            onChange={(e) => updateFilter('min_price', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Цена до"
                            type="number"
                            value={filters.max_price || ''}
                            onChange={(e) => updateFilter('max_price', e.target.value)}
                            fullWidth
                        />
                    </Box>

                    {/* Год */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Год от"
                            type="number"
                            value={filters.year_min || ''}
                            onChange={(e) => updateFilter('year_min', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Год до"
                            type="number"
                            value={filters.year_max || ''}
                            onChange={(e) => updateFilter('year_max', e.target.value)}
                            fullWidth
                        />
                    </Box>

                    {/* Тип двигателя */}
                    <FormControl fullWidth>
                        <InputLabel>Тип двигателя</InputLabel>
                        <Select
                            value={filters.engine_type || ''}
                            onChange={(e) => updateFilter('engine_type', e.target.value)}
                            label="Тип двигателя"
                        >
                            <MenuItem value="">Любой</MenuItem>
                            <MenuItem value="бензин">Бензин</MenuItem>
                            <MenuItem value="дизель">Дизель</MenuItem>
                            <MenuItem value="гибрид">Гибрид</MenuItem>
                            <MenuItem value="электро">Электро</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Коробка передач */}
                    <FormControl fullWidth>
                        <InputLabel>Коробка</InputLabel>
                        <Select
                            value={filters.transmission || ''}
                            onChange={(e) => updateFilter('transmission', e.target.value)}
                            label="Коробка"
                        >
                            <MenuItem value="">Любая</MenuItem>
                            <MenuItem value="автомат">Автомат</MenuItem>
                            <MenuItem value="механика">Механика</MenuItem>
                            <MenuItem value="робот">Робот</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Привод */}
                    <FormControl fullWidth>
                        <InputLabel>Привод</InputLabel>
                        <Select
                            value={filters.drive_type || ''}
                            onChange={(e) => updateFilter('drive_type', e.target.value)}
                            label="Привод"
                        >
                            <MenuItem value="">Любой</MenuItem>
                            <MenuItem value="передний">Передний</MenuItem>
                            <MenuItem value="задний">Задний</MenuItem>
                            <MenuItem value="полный">Полный</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={resetFilters}>Сбросить</Button>
                <Button onClick={onClose} variant="contained">Применить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FiltersModal;