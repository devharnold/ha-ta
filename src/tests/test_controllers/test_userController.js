const { User } = require('../models/user');
const assert = require('assert');
const expect = reqire('chai');
const { userLogin } = require('../controllers/userController');


describe('userController()', function() {
    describe('#registerUser()', function() {
        it('should register and save a user', function(done) {
            var user = User.registerUser(function(err) {
                if(err) done(err);
                else(done);
            })
        });
    })
    before(function (done) {
        User.save(function (err, User) {
            done();
        });
    });
    describe('#find()', function() {
        it('should find a user according to the username', function(done) {
            User.findOne({ username: 'FakeUser'}, function(err, User) {
                done();
            });
        });
    });
    this.afterAll(function(done) {
        done();
    });
});