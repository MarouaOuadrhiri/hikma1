const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function getVisas() {
    const filePath = path.join(__dirname, '../data/visas.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading visas.json:', error);
        return [];
    }
}

router.get('/', (req, res) => {
    const visas = getVisas();
    res.render('visas/index', { visas });
});

router.get('/:id', (req, res) => {
    const id = req.params.id.toLowerCase();
    const visas = getVisas();
    const visa = visas.find(v => v.id === id);

    if (!visa) {
        return res.status(404).render('404');
    }

    res.render('visas/details', { visa });
});

module.exports = router;
