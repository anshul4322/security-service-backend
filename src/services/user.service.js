const httpStatus = require('http-status');
const {User} = require('../models');
const ApiError = require('../utils/ApiError')
const bcrypt = require("bcryptjs");

const getUserById = async (id) => {
    return User.findById(id);
};

const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

const createUser = async(userBody) => {
    if(await User.isEmailTaken(userBody.email)){
        throw new ApiError(httpStatus.OK, "Email already taken");
    }
    const hashedPassword = await bcrypt.hash(userBody.password, 10);
    var empId = "SS"+Math.random().toString().substr(2, 5)
    const user = await User.create({...userBody, empId:empId, password:hashedPassword});
    return user;
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
}