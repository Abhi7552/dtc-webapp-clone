// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public',"HTML")));
app.use(express.static('images'));
app.use(express.json());

// API endpoint to search for a route by route number
app.get('/api/route/:routeNumber', (req, res) => {
    const routeNumber = req.params.routeNumber;

    // Read routes data from routes.json file
    fs.readFile(path.join(__dirname, 'public', 'routes.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading routes data:", err);
            return res.status(500).json({ error: 'Server error' });
        }

        const routes = JSON.parse(data);
        const route = routes.find(r => r.route_number === routeNumber);

        if (route) {
            res.json(route);
        } else {
            res.status(404).json({ error: 'Route not found' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
