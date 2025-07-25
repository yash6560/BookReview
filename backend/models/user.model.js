const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true,
    },
    email: { 
        type: String, 
        unique: true 
    },
    password: {
        type : String,
        require : true,
        minlength : 6,
    },
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User; 

