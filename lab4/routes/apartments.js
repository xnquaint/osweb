const express = require('express');
const Apartment = require('../models/Apartment');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.render('index', { apartments });
    } catch (err) {
        res.status(500).send('Помилка сервера: ' + err.message);
    }
});

router.get('/add', (req, res) => {
    res.render('add-apartment');
});

router.post('/', async (req, res) => {
    try {
        const apartment = new Apartment(req.body);
        await apartment.save();
        res.redirect('/apartments');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        res.render('edit-apartment', { apartment });
    } catch (err) {
        res.status(500).send('Помилка сервера: ' + err.message);
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/apartments');
    } catch (err) {
        res.status(400).send('Помилка при оновленні: ' + err.message);
    }
});

// Видалення квартири
router.post('/delete/:id', async (req, res) => {
    try {
        await Apartment.findByIdAndDelete(req.params.id);
        res.redirect('/apartments');
    } catch (err) {
        res.status(500).send('Помилка сервера: ' + err.message);
    }
});

router.get('/api', async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (err) {
        res.status(500).json({ error: 'Помилка сервера: ' + err.message });
    }
});


module.exports = router
