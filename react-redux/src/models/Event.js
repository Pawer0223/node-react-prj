const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({

    eventId: {
        type: Number
    },

    title: {
        type: String,
        maxlength : 50
    },

    startTime: {
        type: Date,
        default: new Date()
    },

    endTime: {
        type: Date,
        default: new Date()
    },

    maxPeople: {
        type: Number,
        default: 5
    },

    joinPeople: {
        type: Number,
        default: 1
    },

    region:{
        type: String
    },

    subject:{
        type: Number,
        default: 0
    }
})

// 여기서 next는 user.save 의미.. 인자 안넣으면 error 발생 함...
eventSchema.pre('save', function(next){
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

eventSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err)
            return cb(err);
            cb(null, isMatch)
    })
}

eventSchema.methods.genarateToken = function(cb) {
    
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

eventSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded) { // 이게 언제 어디서 들어오지.. ? , 아 이게 verify하면 return 되어서 마지막 callback함수 돌 때 쓰이는 갑다
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

const Event = mongoose.model('Event', eventSchema)

module.exports = { Event }
