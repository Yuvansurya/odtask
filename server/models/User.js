const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    rollno: {
        type: Number,
        unique: true
    }, 
    name: {
        type: String
    }, 
    year: {
        type: String
    },
    dept: {
        type: String
    },
    password: {
        type: String
    }

})

module.exports = mongoose.model('User',userSchema)