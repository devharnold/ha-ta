const { Flight } = require('../models/flight');

exports.searchFlight = async(req, res) => {
    const options = {
        data: search,
        uri: endpointCollection,
        headers,
    }
    try {
        const collection = await browser.get(options, (err, req, body) => JSON.parse(body));
        const flights = await collection.data.forEach(item => parseFlightData(item));

        await flights.forEach(flight => saveFlightInfo(flight));
    }catch(error) {
        handleError(error);
    }
};
