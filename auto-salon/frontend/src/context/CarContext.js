import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';

const CarContext = createContext();

export const useCars = () => useContext(CarContext);

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        brand_id: '',
        category_id: '',
        min_price: '',
        max_price: '',
        year_min: '',
        year_max: '',
        engine_type: '',
        transmission: '',
        drive_type: '',
        sort: 'newest'  // newest, price_asc, price_desc
    });

    // Функция сортировки на клиенте (для надежности)
    const sortCars = (carsToSort, sortType) => {
        const sorted = [...carsToSort];
        
        switch(sortType) {
            case 'price_asc':
                return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
            case 'price_desc':
                return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
            case 'newest':
            default:
                return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
        }
    };

    const fetchCars = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            
            // Добавляем все фильтры в запрос
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value !== '') {
                    params.append(key, value);
                }
            });

            console.log('Запрос к API:', params.toString()); // Для отладки

            const response = await axios.get(`/api/cars/filter?${params.toString()}`);
            
            let carsData = [];
            if (response.data && response.data.data) {
                carsData = response.data.data;
            } else if (Array.isArray(response.data)) {
                carsData = response.data;
            }

            console.log('Получено авто:', carsData.length); // Для отладки
            
            // Применяем сортировку на клиенте для гарантии
            const sortedCars = sortCars(carsData, filters.sort);
            
            setCars(sortedCars);
            setFilteredCars(sortedCars);
            
        } catch (error) {
            console.error('Ошибка загрузки автомобилей:', error);
            setCars([]);
            setFilteredCars([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const fetchBrands = useCallback(async () => {
        try {
            const response = await axios.get('/api/brands');
            setBrands(response.data.data || []);
        } catch (error) {
            console.error('Ошибка загрузки брендов:', error);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data.data || []);
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error);
        }
    }, []);

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    useEffect(() => {
        fetchBrands();
        fetchCategories();
    }, [fetchBrands, fetchCategories]);

    const updateFilter = (key, value) => {
        console.log('Обновление фильтра:', key, value); // Для отладки
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            brand_id: '',
            category_id: '',
            min_price: '',
            max_price: '',
            year_min: '',
            year_max: '',
            engine_type: '',
            transmission: '',
            drive_type: '',
            sort: 'newest'
        });
    };

    return (
        <CarContext.Provider value={{
            cars: filteredCars,
            allCars: cars,
            loading,
            filters,
            brands,
            categories,
            updateFilter,
            resetFilters,
            fetchCars
        }}>
            {children}
        </CarContext.Provider>
    );
};