// country seed file 
const { User, Country } = require('../models');

(async () => {
    try {
        // a new user
        const user = await User.create({
            name: 'Dummy User',
            email: 'dummyemail@example.com',
            password: 'dummypass',
        });

        //a city of origin of the user and current location and where the user is heading to
        const country = await Country.create({
            userId: user.id,
            name: 'Kenya',
        });
        console.log("Success: Country updated!")
    } catch(error) {
        console.log("Error: Creating seed data!", error);
    }
})();