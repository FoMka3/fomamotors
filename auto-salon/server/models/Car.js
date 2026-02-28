const Car = {
    getAll: (db, callback) => {
        const sql = `
            SELECT c.*, b.name as brand_name, b.country as brand_country, cat.name as category_name
            FROM cars c
            LEFT JOIN brands b ON c.brand_id = b.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            ORDER BY c.created_at DESC
        `;
        db.query(sql, callback);
    },

    getById: (db, id, callback) => {
        const sql = `
            SELECT c.*, b.name as brand_name, b.country as brand_country, cat.name as category_name
            FROM cars c
            LEFT JOIN brands b ON c.brand_id = b.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.id = ?
        `;
        db.query(sql, [id], callback);
    },

    getFiltered: (db, filters, callback) => {
        let sql = `
            SELECT c.*, b.name as brand_name, b.country as brand_country, cat.name as category_name
            FROM cars c
            LEFT JOIN brands b ON c.brand_id = b.id
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE 1=1
        `;
        const params = [];

        if (filters.brand_id && filters.brand_id !== '') {
            sql += ' AND c.brand_id = ?';
            params.push(filters.brand_id);
        }
        if (filters.category_id && filters.category_id !== '') {
            sql += ' AND c.category_id = ?';
            params.push(filters.category_id);
        }
        if (filters.min_price && filters.min_price !== '') {
            sql += ' AND c.price >= ?';
            params.push(parseInt(filters.min_price));
        }
        if (filters.max_price && filters.max_price !== '') {
            sql += ' AND c.price <= ?';
            params.push(parseInt(filters.max_price));
        }
        if (filters.year_min && filters.year_min !== '') {
            sql += ' AND c.year >= ?';
            params.push(parseInt(filters.year_min));
        }
        if (filters.year_max && filters.year_max !== '') {
            sql += ' AND c.year <= ?';
            params.push(parseInt(filters.year_max));
        }
        if (filters.engine_type && filters.engine_type !== '') {
            sql += ' AND c.engine_type = ?';
            params.push(filters.engine_type);
        }
        if (filters.transmission && filters.transmission !== '') {
            sql += ' AND c.transmission = ?';
            params.push(filters.transmission);
        }
        if (filters.drive_type && filters.drive_type !== '') {
            sql += ' AND c.drive_type = ?';
            params.push(filters.drive_type);
        }
        if (filters.search && filters.search !== '') {
            sql += ' AND (c.name LIKE ? OR c.description LIKE ?)';
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }

        // Добавляем сортировку по умолчанию
        sql += ' ORDER BY c.created_at DESC';
        
        console.log('SQL запрос:', sql); // Для отладки
        console.log('Параметры:', params); // Для отладки
        
        db.query(sql, params, callback);
    },

    create: (db, carData, callback) => {
        const sql = 'INSERT INTO cars SET ?';
        db.query(sql, carData, callback);
    },

    update: (db, id, carData, callback) => {
        const sql = 'UPDATE cars SET ? WHERE id = ?';
        db.query(sql, [carData, id], callback);
    },

    delete: (db, id, callback) => {
        const sql = 'DELETE FROM cars WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Car;