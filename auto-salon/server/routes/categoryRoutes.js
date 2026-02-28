const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', (req, res) => {
    Category.getAll(req.db, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: results });
    });
});

module.exports = router;