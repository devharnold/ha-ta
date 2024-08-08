const User = require("../models/models/user");
const asyncHandler = require("express-async-handler");

// handles user display detail
exports.user_detial = asyncHandler(async (req, res, next) => {
    res.send(`Not Implemented: Author detail: ${req.params.id}`);
});

//handles user details update
exports.user_update_detail = asyncHandler(async (req, res, next) => {
    res.send("Not updated: User profile update");
});

