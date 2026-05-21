require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// Routers
const indexRouter = require('./routes/index');
const universitiesRouter = require('./routes/universities');
const majorsRouter = require('./routes/majors');
const servicesRouter = require('./routes/services');
const visasRouter = require('./routes/visas');
const blogRouter = require('./routes/blog');
const multimediaRouter = require('./routes/multimedia');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Form Submission Route proxy to Google Apps Script
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, address, date, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
        }

        const scriptUrl = process.env.APPS_SCRIPT_URL ? process.env.APPS_SCRIPT_URL.trim() : null;
        
        if (!scriptUrl) {
             return res.status(500).json({ success: false, message: 'Apps Script URL not configured.' });
        }

        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, address, date, message })
        });

        const rawText = await response.text();
        let result;
        try {
            result = JSON.parse(rawText);
        } catch (e) {
            console.error("Apps Script returned non-JSON response:", rawText);
            return res.status(500).json({ success: false, message: 'Google Apps Script configuration error. Check console.' });
        }
        
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }

    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        res.status(500).json({ success: false, message: 'Oops! Something went wrong and we couldn\'t save your message.' });
    }
});

// Register feature routers
app.use('/', indexRouter);
app.use('/universities', universitiesRouter);
app.use('/majors', majorsRouter);
app.use('/services', servicesRouter);
app.use('/visas', visasRouter);
app.use('/blog', blogRouter);
app.use('/multimedia', multimediaRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// https://docs.google.com/spreadsheets/d/15iUrsxMxHz_DEKAX4ltp8UplM-VwVHTISaD2foeH6hs/edit?gid=0#gid=0