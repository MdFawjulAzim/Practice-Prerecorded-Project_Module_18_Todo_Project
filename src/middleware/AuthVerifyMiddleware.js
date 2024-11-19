let jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['token-key'];


    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, "SecretKey36", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Token" });
        } else {
            //get UserName from decoded token & add with req header 
            let UserName = decoded['data']['UserName'];
            req.headers.UserName = UserName;
            next();
        }
    });
};