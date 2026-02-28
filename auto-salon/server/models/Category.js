const Category = {
    getAll: (db, callback) => {
        const sql = 'SELECT * FROM categories ORDER BY name';
        db.query(sql, callback);
    },

    getById: (db, id, callback) => {
        const sql = 'SELECT * FROM categories WHERE id = ?';
        db.query(sql, [id], callback);
    },

    create: (db, categoryData, callback) => {
        const sql = 'INSERT INTO categories SET ?';
        db.query(sql, categoryData, callback);
    },

    update: (db, id, categoryData, callback) => {
        const sql = 'UPDATE categories SET ? WHERE id = ?';
        db.query(sql, [categoryData, id], callback);
    },

    delete: (db, id, callback) => {
        const sql = 'DELETE FROM categories WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Category;