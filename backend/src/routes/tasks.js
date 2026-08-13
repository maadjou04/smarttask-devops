const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET toutes les tâches
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer une tâche
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Le titre est requis' });
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description || '', 'todo']
    );
    res.status(201).json({ id: result.insertId, title, description, status: 'todo' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT mettre à jour le statut d'une tâche
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Tâche mise à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
