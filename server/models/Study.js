const mongoose = require("mongoose");

const studySchema = mongoose.Schema({
    // pk
    studyId: {
        type: Number
    },
    // 날짜
    studyDate: {
        type: Date
    },
    // 시작시간
    startTime: {
        type: String
    },
    // 종료시간
    endTime: {
        type: String
    },
    // 참여 인원
    maxPeople: {
        type: Number,
        default: 2
    },
    // 현재 인원
    joinPeople: {
        type: Number,
        default: 1
    },
    // 주제
    subject:{
        type: Number,
        default: 0
    },
    // study 내용
    content:{
        type: String,
        maxlength : 3000 // 1000자로 제한하기..
    },
    // 지역
    region:{
        type: String
    },
    // 장소
    station:{
        type: String
    },
})

const Study = mongoose.model('Study', studySchema)

module.exports = { Study }
