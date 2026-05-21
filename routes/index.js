const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/pricing', (req, res) => {
    res.render('pricing');
});

router.get('/appointment', (req, res) => {
    res.render('appointment');
});

module.exports = router;
