const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { email, password, first_name, last_name, phone } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            error: 'Email и пароль обязательны' 
        });
    }

    // Проверяем, есть ли уже такой пользователь
    db.query(
        'SELECT id FROM users WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: 'Ошибка сервера' });
            }

            if (results.length > 0) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Пользователь с таким email уже существует' 
                });
            }

            // Хешируем пароль
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, error: 'Ошибка хеширования пароля' });
                }

                const newUser = {
                    email,
                    password: hash,
                    first_name,
                    last_name,
                    phone
                };

                db.query(
                    'INSERT INTO users SET ?',
                    [newUser],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ success: false, error: 'Ошибка создания пользователя' });
                        }

                        const token = jwt.sign(
                            { user: { id: result.insertId, email } },
                            process.env.JWT_SECRET,
                            { expiresIn: '7d' }
                        );

                        res.status(201).json({
                            success: true,
                            message: 'Регистрация успешна',
                            token,
                            user: { id: result.insertId, email, first_name, last_name, phone }
                        });
                    }
                );
            });
        }
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            error: 'Email и пароль обязательны' 
        });
    }

    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, results) => {
            if (err || results.length === 0) {
                return res.status(401).json({ 
                    success: false, 
                    error: 'Неверный email или пароль' 
                });
            }

            const user = results[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).json({ 
                        success: false, 
                        error: 'Неверный email или пароль' 
                    });
                }

                const token = jwt.sign(
                    { user: { id: user.id, email: user.email, is_admin: user.is_admin } },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );

                res.json({
                    success: true,
                    message: 'Вход выполнен успешно',
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        phone: user.phone,
                        is_admin: user.is_admin
                    }
                });
            });
        }
    );
};

exports.verifyToken = (req, res) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            error: 'Нет токена' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ 
            success: true, 
            user: decoded.user 
        });
    } catch (err) {
        res.status(401).json({ 
            success: false, 
            error: 'Токен недействителен' 
        });
    }
};