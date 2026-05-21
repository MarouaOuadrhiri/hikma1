const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper to read blog JSON
function getBlogs() {
    const filePath = path.join(__dirname, '../data/blog.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading blog.json:", e);
        return [];
    }
}

// 1. Blog Standard List
router.get('/', (req, res) => {
    const blogs = getBlogs();
    res.render('blog/index', { blogs });
});

// 2. Blog Grid View
router.get('/grid', (req, res) => {
    const blogs = getBlogs();
    res.render('blog/grid', { blogs });
});

// 3. Blog Article Details
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const blogs = getBlogs();
    const blog = blogs.find(b => b.id === id);
    
    if (!blog) {
        return res.status(404).render('404');
    }
    
    res.render('blog/details', { blog, allBlogs: blogs });
});

module.exports = router;
