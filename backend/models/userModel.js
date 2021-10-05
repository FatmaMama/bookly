const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [30, "Your name can not exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Your password must be longer than 6 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: String,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Encrypting password before saving user
// userSchema.pre('save', async function(next){
   
//     if(!this.isModified('passwrod')){
//         next()
//     };
    
//     this.password = await bcrypt.hash(this.password, 10)
    
// });

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.hashPassword(this.password)
        .then((password) => {
            this.password = password;
            next();
        });
});

userSchema.methods = {
    hashPassword(password) {
        return bcrypt.hash(password, 10);
    },

    getJwtToken() {
        return jwt.sign({ id : this._id}, process.env.JWT_SECRET, {
            expiresIn : process.env.JWT_EXPIRES_TIME
        })
    },

    async comparePassword(enteredPassword){
        return  await bcrypt.compare(enteredPassword, this.password)
    }
}


const User = mongoose.model('User', userSchema);
module.exports = User;