const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

router.get('/', (req, res) => {
    Brand.getAll(req.db, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: results });
    });
});

module.exports = router;