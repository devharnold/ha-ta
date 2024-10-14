import express from'express';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
// import { searchFlights } from '../controllers/flightController.js';
/**import requestLogger from '../middlewares/requestLogger';
import validateEnv from '../middlewares/validateEnv';
import errorHandler from '../middlewares/errorHandler';*/
const PORT = '3001';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

const app = express();
const router = express.Router();

//app.use(requestLogger);
//app.use(validateEnv);

// app.use(searchFlights);

export async function getAmadeusToken() {
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
    } catch (error) {
        console.error('Error processing your fetch token request: ', error.message);
        return null;
    }
}

export async function searchFlights(req, res) {
    const { departureCity, arrivalCity, departureDate } = req.query;

    const token = await getAmadeusToken();
    if (!token) {
        return res.status(500).send('Error trying to find a token');
    }

    try {
        const response = await fetch('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                originLocationCode: departureCity,
                destinationLocationCode: arrivalCity,
                departureDate: departureDate,
                adults: 1,  // example static data, adjust as needed
            },
        });

        const data = await response.json();
        const flights = data.data;

        if (flights && flights.length > 0) {
            const airlineRedirectUrl = flights[0].links.self;
            return res.redirect(airlineRedirectUrl);
        } else {
            return res.send('No flights found.');
        }
    } catch (error) {
        console.error('Error finding flights', error.message);
        return res.status(500).send('Error fetching data!');
    }
}

/**router.get('/search-flights', async (req, res) => {
    const { departureCity, arrivalCity, departureDate } = req.query;

    const token = await getAmadeusToken();
    if(!token) {
        return res.status(500).send('Error processing fetch-token');
    }
    try {
        const response = await fetch('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
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
});*/

app.use('/api', router)

//app.use(errorHandler);

export default getAmadeusToken;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});