const db = require('../config/database');
const bcrypt = require('bcryptjs');

exports.getProfile = (req, res) => {
    const userId = req.user.id;

    db.query(
        'SELECT id, email, first_name, last_name, phone FROM users WHERE id = ?',
        [userId],
        (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ success: false, error: 'Пользователь не найден' });
            }
            res.json({ success: true, data: results[0] });
        }
    );
};

exports.updateProfile = (req, res) => {
    const userId = req.user.id;
    const { first_name, last_name, phone } = req.body;

    db.query(
        'UPDATE users SET first_name = ?, last_name = ?, phone = ? WHERE id = ?',
        [first_name, last_name, phone, userId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: 'Ошибка обновления профиля' });
            }
            res.json({ success: true, message: 'Профиль обновлён' });
        }
    );
};

exports.getUserOrders = (req, res) => {
    const userId = req.user.id;

    db.query(
        `SELECT o.*, COUNT(oi.id) as items_count 
         FROM orders o 
         LEFT JOIN order_items oi ON o.id = oi.order_id 
         WHERE o.user_id = ? 
         GROUP BY o.id 
         ORDER BY o.created_at DESC`,
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