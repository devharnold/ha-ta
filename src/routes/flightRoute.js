const express = require('express');
const app = express();
const router = express.Router();
const { Flight } = require('../models/flight')
const { searchFlight } = require('../controllers/flightController');

app.use(express.json());

router.get('/flight/:id', async(req, res) => {
    try {
        const flightId = req.params.id;
        const searchFlight = await Flight.FindByPk(flightId);
        
        if(flight) {
            res.json(user);
        } else {
            res.status(404).send({ message: 'Flight not found!' });
        }
    } catch(error) {
        console.error('Error processing request', error);
        res.status(500).send({ message: 'Server error' });
    }
});

router.get('/flight', async(req, res) => {
    try {
        const flightId = req.params.id;
        const flight = await Flight.FindByMany(flight);
        
        if(flight) {
            res.json(user);
        } else {
            res.status(404).send({ message: 'Flight not found!' });
        }
    } catch(error) {
        console.error('Error processing request', error);
        res.status(500).send({ message: 'Server error' });
    }
});
