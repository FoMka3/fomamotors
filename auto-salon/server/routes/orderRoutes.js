const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Публичные маршруты
router.post('/', orderController.createOrder);
router.get('/track/:id', orderController.trackOrder);

// Защищённые маршруты (для авторизованных)
router.get('/my', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;