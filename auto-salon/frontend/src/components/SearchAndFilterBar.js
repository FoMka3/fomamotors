import React from 'react';
import { 
    Box, 
    TextField, 
    InputAdornment, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel,
    Button
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { useCars } from '../context/CarContext';

const SearchAndFilterBar = ({ onFilterClick }) => {
    const { filters, updateFilter } = useCars();

    const handleSortChange = (event) => {
        const value = event.target.value;
        console.log('Сортировка изменена на:', value);
        updateFilter('sort', value);
    };

    return (
        <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
            <TextField
                placeholder="Поиск по названию..."
                value={filters.search || ''}
                onChange={(e) => updateFilter('search', e.target.value)}
                size="small"
                sx={{ flexGrow: 1, minWidth: 200 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ fontSize: '1.2rem', color: '#4A6572' }} />
                        </InputAdornment>
                    ),
                    sx: { borderRadius: 2 }
                }}
            />
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel sx={{ fontSize: '0.9rem' }}>Сортировка</InputLabel>
                <Select
                    value={filters.sort || 'newest'}
                    onChange={handleSortChange}
                    label="Сортировка"
                    sx={{ borderRadius: 2, fontSize: '0.9rem' }}
                >
                    <MenuItem value="newest" sx={{ fontSize: '0.9rem' }}>Сначала новые</MenuItem>
                    <MenuItem value="price_asc" sx={{ fontSize: '0.9rem' }}>Сначала дешевле</MenuItem>
                    <MenuItem value="price_desc" sx={{ fontSize: '0.9rem' }}>Сначала дороже</MenuItem>
                </Select>
            </FormControl>

            <Button
                onClick={onFilterClick}
                variant="outlined"
                size="small"
                startIcon={<FilterIcon />}
                sx={{ 
                    borderRadius: 2,
                    borderColor: '#1E2A3A',
                    color: '#1E2A3A',
                    px: 2,
                    '&:hover': {
                        borderColor: '#2C3E50',
                        backgroundColor: 'rgba(30,42,58,0.05)'
                    }
                }}
            >
                Фильтры
            </Button>
        </Box>
    );
};

export default SearchAndFilterBar;