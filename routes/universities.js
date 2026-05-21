const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read universities JSON
function getUniversities() {
    const filePath = path.join(__dirname, '../data/universities.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading universities.json:", e);
        return [];
    }
}

// 1. All Universities List
router.get('/', (req, res) => {
    const universities = getUniversities();
    res.render('universities/index', { universities });
});

// 2. University Details
router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    const universities = getUniversities();
    const university = universities.find(u => u.id === id);
    
    if (!university) {
        return res.status(404).render('404');
    }
    
    res.render('universities/details', { university, allUniversities: universities });
});

// 3. Country-Specific Guide and Universities
router.get('/:country', (req, res) => {
    const country = req.params.country.toLowerCase();
    const universities = getUniversities();
    const filteredUnis = universities.filter(u => u.country === country);
    
    // We render universities/country, which will contain layout logic for Spain or Romania dynamically
    if (country === 'spain' || country === 'romania' || country === 'turkey') {
        res.render('universities/country', { country, universities: filteredUnis });
    } else {
        res.status(404).render('404');
    }
});

// 4. City-Specific List
router.get('/:country/:city', (req, res) => {
    const country = req.params.country.toLowerCase();
    let city = req.params.city.toLowerCase();
    
    // Decode URI component just in case arabic is used for city
    city = decodeURIComponent(city);
    
    const universities = getUniversities();
    
    // Match city (could be in English or Arabic, we check if it is part of city name)
    const filteredUnis = universities.filter(u => {
        const isCountryMatch = u.country === country;
        let isCityMatch = false;
        
        if (city === 'madrid' && u.city === 'مدريد') isCityMatch = true;
        else if (city === 'barcelona' && u.city === 'برشلونة') isCityMatch = true;
        else if ((city === 'valencia' || city === 'valencia-malaga') && (u.city === 'فالنسيا' || u.city === 'مالقا')) isCityMatch = true;
        else if (city === 'istanbul' && u.city === 'إسطنبول') isCityMatch = true;
        else if (u.city.toLowerCase() === city) isCityMatch = true;
        
        return isCountryMatch && isCityMatch;
    });
    
    // Let's resolve the Arabic title of the city for displaying on the page
    let cityArabicName = city;
    if (city === 'madrid') cityArabicName = 'مدريد';
    else if (city === 'barcelona') cityArabicName = 'برشلونة';
    else if (city === 'valencia-malaga') cityArabicName = 'فالنسيا ومالقا';
    else if (city === 'istanbul') cityArabicName = 'إسطنبول';
    
    res.render('universities/city', { country, city: cityArabicName, universities: filteredUnis });
});

module.exports = router;
