const Car = require('../models/Car');

exports.getAllCars = (req, res) => {
    Car.getAll(req.db, (err, results) => {
        if (err) {
            console.error('Ошибка получения автомобилей:', err);
            return res.status(500).json({ success: false, error: 'Ошибка получения автомобилей' });
        }
        res.json({ success: true, count: results.length, data: results });
    });
};

exports.getCarById = (req, res) => {
    Car.getById(req.db, req.params.id, (err, results) => {
        if (err) {
            console.error('Ошибка получения автомобиля:', err);
            return res.status(500).json({ success: false, error: 'Ошибка получения автомобиля' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, error: 'Автомобиль не найден' });
        }
        res.json({ success: true, data: results[0] });
    });
};

exports.getFilteredCars = (req, res) => {
    console.log('Получены фильтры:', req.query); // Для отладки
    
    Car.getFiltered(req.db, req.query, (err, results) => {
        if (err) {
            console.error('Ошибка фильтрации автомобилей:', err);
            return res.status(500).json({ success: false, error: 'Ошибка фильтрации автомобилей' });
        }
        
        // Применяем сортировку на сервере
        let sortedResults = [...results];
        const { sort } = req.query;
        
        if (sort === 'price_asc') {
            sortedResults.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sort === 'price_desc') {
            sortedResults.sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (sort === 'newest') {
            sortedResults.sort((a, b) => (b.year || 0) - (a.year || 0));
        }
        
        console.log('Найдено авто после сортировки:', sortedResults.length); // Для отладки
        
        res.json({ success: true, count: sortedResults.length, data: sortedResults });
    });
};

exports.createCar = (req, res) => {
    Car.create(req.db, req.body, (err, result) => {
        if (err) {
            console.error('Ошибка создания автомобиля:', err);
            return res.status(500).json({ success: false, error: 'Ошибка создания автомобиля' });
        }
        res.status(201).json({ success: true, message: 'Автомобиль создан', id: result.insertId });
    });
};

exports.updateCar = (req, res) => {
    Car.update(req.db, req.params.id, req.body, (err, result) => {
        if (err) {
            console.error('Ошибка обновления автомобиля:', err);
            return res.status(500).json({ success: false, error: 'Ошибка обновления автомобиля' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Автомобиль не найден' });
        }
        res.json({ success: true, message: 'Автомобиль обновлён' });
    });
};

exports.deleteCar = (req, res) => {
    Car.delete(req.db, req.params.id, (err, result) => {
        if (err) {
            console.error('Ошибка удаления автомобиля:', err);
            return res.status(500).json({ success: false, error: 'Ошибка удаления автомобиля' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Автомобиль не найден' });
        }
        res.json({ success: true, message: 'Автомобиль удалён' });
    });
};