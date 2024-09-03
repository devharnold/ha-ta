const { Review } = require('../models/review');
// const { User } = require('../models/user');
const expect = require('chai');
const { Sequelize, DataTypes, Model } = require('sequelize');
require(dotenv).confgig();

class Review extends Model {}

const sequelize = new Sequelize('hataData', 'root', process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
});

describe('MySQL Connection', function () {
    // create a mysql connection first
    this.before(async function() {
        try {
            await sequelize.authenticate();
            console.log('Connected');

            Review.init({
                userId: DataTypes.INTEGER,
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                message: DataTypes.STRING,
            }, { 
                sequelize,
                modelName: 'Review',
                tablename: 'review',
                timestamps: true,
            });
            await sequelize.sync({ force: true });
        } catch(err) {
            console.err('Unable to connect', err);
        }
    });
    this.beforeEach(async function() {
        await Review.destroy({ where: {} })
    });

    it('should save a review to the database', async function () {
        const review = await Review.create({ 
            title: 'Review on my app usage',
            description: 'Complement',
            message: 'I like this app to bits',
        });
        const foundReview = await Review.findOne({ where: { description: 'Complement' } });

        expect(foundReview).to.exist;
        expect(foundReview.description).to.equal('Complement')
    })
    describe('#find()', function() {
        this.beforeEach(function (done) {
            Review.save(function(err, Review) {
                done();
            });
        });
        it('should find review by description', function(done) {
            Review.findOne({ description: 'Complement' }, function(err, review) {
                done();
            });
        });
    })
    afterAll(function (done) {
        done();
    });
})