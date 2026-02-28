const db = require('../config/database');

exports.getStats = (req, res) => {
    const queries = {
        cars: 'SELECT COUNT(*) as count FROM cars',
        users: 'SELECT COUNT(*) as count FROM users',
        orders: 'SELECT COUNT(*) as count, COALESCE(SUM(total_amount), 0) as revenue FROM orders',
        recentOrders: 'SELECT * FROM orders ORDER BY created_at DESC LIMIT 5'
    };

    db.query(queries.cars, (err, carsRes) => {
        if (err) return res.status(500).json({ success: false, error: err.message });

        db.query(queries.users, (err, usersRes) => {
            if (err) return res.status(500).json({ success: false, error: err.message });

            db.query(queries.orders, (err, ordersRes) => {
                if (err) return res.status(500).json({ success: false, error: err.message });

                db.query(queries.recentOrders, (err, recentRes) => {
                    if (err) return res.status(500).json({ success: false, error: err.message });

                    res.json({
                        success: true,
                        data: {
                            cars: carsRes[0].count,
                            users: usersRes[0].count,
                            orders: ordersRes[0].count,
                            revenue: ordersRes[0].revenue,
                            recentOrders: recentRes
                        }
                    });
                });
            });
        });
    });
};

exports.getAllUsers = (req, res) => {
    db.query(
        'SELECT id, email, first_name, last_name, phone, is_admin, created_at FROM users',
        (err, results) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.json({ success: true, data: results });
        }
    );
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, phone, is_admin } = req.body;

    db.query(
        'UPDATE users SET first_name = ?, last_name = ?, phone = ?, is_admin = ? WHERE id = ?',
        [first_name, last_name, phone, is_admin, userId],
        (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, error: 'Пользователь не найден' });
            }
            res.json({ success: true, message: 'Пользователь обновлён' });
        }
    );
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Пользователь не найден' });
        }
        res.json({ success: true, message: 'Пользователь удалён' });
    });
};

exports.getAllOrders = (req, res) => {
    db.query(
        `SELECT o.*, 
         COUNT(oi.id) as items_count,
         GROUP_CONCAT(oi.car_name SEPARATOR ', ') as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         GROUP BY o.id
         ORDER BY o.created_at DESC`,
        (err, results) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.json({ success: true, data: results });
        }
    );
};

exports.updateOrderStatus = (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    db.query(
        'UPDATE orders SET status = ? WHERE id = ?',
        [status, orderId],
        (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, error: 'Заказ не найден' });
            }
            res.json({ success: true, message: 'Статус заказа обновлён' });
        }
    );
};