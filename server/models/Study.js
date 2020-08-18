const mongoose = require("mongoose");

const studySchema = mongoose.Schema({
    // pk
    studyId: {
        type: Number
    },
    // 제목
    title: {
        type: String,
        maxlength : 50
    },
    // 날짜
    studyDate: {
        type: String
    },
    // 시작시간
    startTime: {
        type: String,
        default: new Date()
    },
    // 종료시간
    endTime: {
        type: String,
        default: new Date()
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
