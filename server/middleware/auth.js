const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리

    // 클라이언트 쿠키에서 토큰 가져오기   
    let token = req.cookies.x_auth;

    //console.log(req);

    console.log('req... ')
    console.log('token... ' , token)
    
    // 토큰 복호화
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({
                isAuth: false,
                error: true
            })
        req.token = token;
        req.user = user;
        // next를 해줌으로써, app.get('/api/users/auth', auth, (req, res) 의 3번째 functino으로 넘어갈 수 있다.
        next();
    });
}

module.exports = { auth };