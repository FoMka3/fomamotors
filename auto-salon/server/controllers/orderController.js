const db = require('../config/database');

exports.createOrder = (req, res) => {
    const { customer_name, customer_email, customer_phone, items, total_amount } = req.body;
    
    if (!customer_email || !customer_phone || !items || !total_amount) {
        return res.status(400).json({ success: false, error: 'Заполните все поля' });
    }

    const order = {
        customer_name,
        customer_email,
        customer_phone,
        total_amount,
        status: 'new'
    };

    db.query('INSERT INTO orders SET ?', order, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Ошибка создания заказа' });
        }

        const orderId = result.insertId;
        const orderItems = items.map(item => [
            orderId,
            item.car_id,
            item.car_name,
            item.quantity,
            item.unit_price,
            item.total_price
        ]);

        db.query(
            'INSERT INTO order_items (order_id, car_id, car_name, quantity, unit_price, total_price) VALUES ?',
            [orderItems],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, error: 'Ошибка создания позиций заказа' });
                }
                res.status(201).json({ 
                    success: true, 
                    message: 'Заказ создан', 
                    order_id: orderId 
                });
            }
        );
    });
};

exports.getUserOrders = (req, res) => {
    const userId = req.user.id;

    db.query(
        'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: 'Ошибка получения заказов' });
            }
            res.json({ success: true, data: results });
        }
    );
};

exports.getOrderById = (req, res) => {
    const orderId = req.params.id;

    db.query(
        'SELECT * FROM orders WHERE id = ?',
        [orderId],
        (err, orderResults) => {
            if (err || orderResults.length === 0) {
                return res.status(404).json({ success: false, error: 'Заказ не найден' });
            }

            db.query(
                'SELECT * FROM order_items WHERE order_id = ?',
                [orderId],
                (err, itemsResults) => {
                    if (err) {
                        return res.status(500).json({ success: false, error: 'Ошибка получения товаров' });
                    }
                    res.json({ 
                        success: true, 
                        data: {
                            ...orderResults[0],
                            items: itemsResults
                        }
                    });
                }
            );
        }
    );
};

exports.trackOrder = (req, res) => {
    const orderId = req.params.id;

    db.query(
        'SELECT id, status, created_at FROM orders WHERE id = ?',
        [orderId],
        (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ success: false, error: 'Заказ не найден' });
            }
            res.json({ success: true, data: results[0] });
        }
    );
};