const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: Number,
    authSource: String,
    name: String
});

mongoose.model('users', userSchema);