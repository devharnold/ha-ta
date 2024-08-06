/**
 * 
 * 
 * 
 * 
 */

const review = require('../models/review');
const user = require('../models/user');

const createReview = async (req, res) => {
    try {
        const review = await user.createReview({
            title: req.body.title,
            message: req.body.message,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const getReview = async (req, res) => {
    try {
        const review = await review.getReview({
            id: req.body.id,
        });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await review.deleteReview({
            id: req.body.id,
        });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await review.updateReview({
            id: req.body.id,
        });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

model.exports = { createReview }, { getReview }, { deleteReview }, { updateReview }