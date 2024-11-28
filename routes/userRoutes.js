const express = require('express');
const router = express.Router();
const db = require('../db');

// GET semua data user
router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST tambah user baru
router.post('/users', (req, res) => {
    const { email, password, nama_user } = req.body;
    const query = 'INSERT INTO users (email, password, nama_user) VALUES (?, ?, ?)';
    db.query(query, [email, password, nama_user], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, email, nama_user });
    });
});

// PUT update data user
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { email, password, nama_user } = req.body;
    const query = 'UPDATE users SET email = ?, password = ?, nama_user = ? WHERE id = ?';
    db.query(query, [email, password, nama_user, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated successfully' });
    });
});

// DELETE hapus user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
