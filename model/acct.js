
const mongoose = require('mongoose');
// const { Schema } = mongoose;

const userAndPwd = new mongoose.Schema({
    username: String,
    password: String,
    cond: {
        type: Number,
        default: 1
    }
});

const userInstance = mongoose.model('MRJONES', userAndPwd);
module.exports = userInstance;