const Brand = {
    getAll: (db, callback) => {
        const sql = 'SELECT * FROM brands ORDER BY name';
        db.query(sql, callback);
    },

    getById: (db, id, callback) => {
        const sql = 'SELECT * FROM brands WHERE id = ?';
        db.query(sql, [id], callback);
    },

    create: (db, brandData, callback) => {
        const sql = 'INSERT INTO brands SET ?';
        db.query(sql, brandData, callback);
    },

    update: (db, id, brandData, callback) => {
        const sql = 'UPDATE brands SET ? WHERE id = ?';
        db.query(sql, [brandData, id], callback);
    },

    delete: (db, id, callback) => {
        const sql = 'DELETE FROM brands WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Brand;