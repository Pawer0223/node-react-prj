const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10

const userSchema = mongoose.Schema({
    nickName : {
        type: String,
        maxlength : 50
    },
    email : {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    profile: {
        type: String
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 여기서 next는 user.save 의미.. 인자 안넣으면 error 발생 함...
userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
    // 암호화
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err)
            return next(err);
        
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err)
                    return next(err);
                    user.password = hash;
                    next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err)
            return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.genarateToken = function(cb) {
    
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    // token = user._id + 'sercretToken';
    // 2번째 인자 값(secretToekn)을 알고 있어야 나중에 token정보를 조회할 수 있다.
    user.token = token;
    user.save(function(err, user){
        if(err)
            return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        user.findOne({
            "_id": decoded,
            "token": token
        }, function(err, user){
            if(err)
                return cb(err);
            cb(null, user);
        })
    });
}

const User = mongoose.model('User', userSchema)

module.exports = { User }