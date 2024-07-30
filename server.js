const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataFilePath = path.join(__dirname, 'data', 'availability.json');

// Endpoint to get availability
app.get('/api/availability', (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to submit availability
app.post('/api/availability', (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const availabilities = JSON.parse(data);
        availabilities.push(req.body);

        fs.writeFile(dataFilePath, JSON.stringify(availabilities, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing data');
                return;
            }
            res.status(200).send('Availability submitted successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});