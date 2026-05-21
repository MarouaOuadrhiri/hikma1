const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read services JSON
function getServices() {
    const filePath = path.join(__dirname, '../data/services.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading services.json:", e);
        return [];
    }
}

// 1. Services List
router.get('/', (req, res) => {
    const services = getServices();
    res.render('services/index', { services });
});

// 2. Service Details
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const services = getServices();
    const service = services.find(s => s.id === id);
    
    if (!service) {
        return res.status(404).render('404');
    }
    
    res.render('services/details', { service, allServices: services });
});

module.exports = router;
