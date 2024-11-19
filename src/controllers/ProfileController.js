const ProfileModel = require('../models/ProfileModels.js'); 
let jwt = require('jsonwebtoken');

exports.CreateProfile = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await ProfileModel.create(reqBody);
        return res.status(200).json({ status: "success", data: data });
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
};


exports.UserLogin = async (req, res) => {
    try {
        let reqBody = req.body;
        let UserName = reqBody.UserName;
        let Password = reqBody.Password;
        const data =  await ProfileModel.find({ UserName: UserName, Password: Password})
        if(!data || data.length === 0) {
            return res.status(401).json({ status: "UnAuthorized"});
        }else{
            //Create Auth Token
            let payload = {
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data: data[0]
            }
            let token = jwt.sign(payload, 'SecretKey36');


            return res.status(200).json({ status: "success",token:token,data: data });
        }
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
};


exports.SelectProfile = async(req,res) => {
    try {
        let UserName = req.headers.UserName; 
        const data = await ProfileModel.find({ UserName: UserName});
        if(!data || data.length === 0) {
            return res.status(404).json({ status: "Not Found"});
        }else{
            return res.status(200).json({ status: "success", data: data });
        }
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
}