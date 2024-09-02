const express = require('express');
const app = express();
const router = express.Router();
require('dotnev').config();
const requestLogger = require('../middlewares/requestLogger');
const validateEnv = require('../middlewares/validateEnv')
const errorHandler = require('../middlewares/errorHandler')

const PORT = '3001';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

app.use(requestLogger);
app.use(validateEnv);

async function getAmadeusToken() {
    try {
        const response = await fetch('https://test.api.amadeus.com/v1/security/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: AMADEUS_API_KEY,
                client_secret: AMADEUS_API_SECRET,
            })
        });

        const data = await response.json();
        return data.access_token;
    } catch (err) {
        console.err('Error processing your fetch token request: ', err.message);
        return null;
    }
}

router.get('/search-flights', async (req, res) => {
    const { depatureCity, arrivalCity, depatureDate } = req.query;

    const token = await getAmadeusToken();
    if(!token) {
        return res.status(500).send('Error processing fetch-token');
    }
    try {
        const response = await fetch('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
            body: new URLSearchParams({
                originLocationCode: depatureCity,
                destinationLocationCode: arrivalCity,
                depatureDate: depatureDate,
                adults: 1,
            })
        });
        const data = await response.json();
        const flights = data.data;

        if (flights && flights.length > 0) {
            const airlineRedirectUrl = flights[0].links.self;
            return res.redirect(airlineRedirectUrl);
        } else {
            res.send('No flights found.');
        }
    } catch(error) {
        console.error('Error fetching your flights', error.message);
        res.status(500).send('Error fetching data!')
    }
});

app.use('/api', router)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://loclhost:${port}`);
});