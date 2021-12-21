const mongoose = require('mongoose');
const connect= ()=> {
    return mongoose.connect("mongodb+srv://ranjan:ranjan123@cluster0.lzaxy.mongodb.net/redis",{

    });
};

module.exports = connect;
