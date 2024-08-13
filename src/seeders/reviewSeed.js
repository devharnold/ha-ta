// seed file for the review and user model

const { User, Review } = require('../models');

(async () => {
    try {
        //create a new user
        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'seeededpassword',
        });
        
        //a review associated with the user
        const review = await Review.create({
            userId: user.id,
            title: 'Review on recent flight',
            description: 'Loved your services',
            message: 'Would try again using your product',
        });

        console.log("Success: Seed data collected!");

    } catch (error) {
        console.log("Error: Creating seed data!", error);
    }
})();