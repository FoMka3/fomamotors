const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const auth = require('../middleware/auth');

// Публичные маршруты
router.get('/', carController.getAllCars);
router.get('/filter', carController.getFilteredCars);
router.get('/:id', carController.getCarById);

// Защищённые маршруты (только для админа)
router.post('/', auth, carController.createCar);
router.put('/:id', auth, carController.updateCar);
router.delete('/:id', auth, carController.deleteCar);

module.exports = router;