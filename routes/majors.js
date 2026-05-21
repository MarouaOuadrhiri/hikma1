const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read majors JSON
function getMajors() {
    const filePath = path.join(__dirname, '../data/majors.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading majors.json:", e);
        return [];
    }
}

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

// 1. Majors Listing
router.get('/', (req, res) => {
    const majors = getMajors();
    // Group majors by category
    const dut = majors.filter(m => m.category === 'dut');
    const bachelor = majors.filter(m => m.category === 'bachelor');
    const doctorate = majors.filter(m => m.category === 'doctorate');
    
    res.render('majors/index', { dut, bachelor, doctorate });
});

// 2. Specific Category List (e.g., /majors/dut, /majors/bachelor, /majors/doctorate)
router.get('/:category_or_id', (req, res) => {
    const param = req.params.category_or_id.toLowerCase();
    const majors = getMajors();
    
    // First check if it's a category
    if (['dut', 'bachelor', 'doctorate'].includes(param)) {
        const filteredMajors = majors.filter(m => m.category === param);
        let categoryArabicName = 'أهم التخصصات';
        if (param === 'dut') categoryArabicName = 'التكوين المهني (DUT)';
        else if (param === 'bachelor') categoryArabicName = 'بكالوريوس (Baccalaurios)';
        else if (param === 'doctorate') categoryArabicName = 'دكتوراه (Doctorat)';
        
        return res.render('majors/index', { 
            dut: param === 'dut' ? filteredMajors : [],
            bachelor: param === 'bachelor' ? filteredMajors : [],
            doctorate: param === 'doctorate' ? filteredMajors : [],
            activeTab: param,
            categoryName: categoryArabicName
        });
    }
    
    // Otherwise check if it's a specific major ID
    const major = majors.find(m => m.id === param);
    if (!major) {
        return res.status(404).render('404');
    }
    
    // Find universities that offer this major
    const universities = getUniversities();
    const offeringUnis = universities.filter(u => major.universities.includes(u.id));
    
    res.render('majors/details', { major, offeringUnis });
});

module.exports = router;
