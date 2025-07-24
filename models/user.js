const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    lastName: {
        type: String,
        required: true,

        trim: true,
        minlength: 2,
    },
}, { timestamps: true });


module.exports= mongoose.models.User || mongoose.model('User', userSchema);
