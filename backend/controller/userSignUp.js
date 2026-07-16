const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;
        
        const user = await userModel.findOne({email})
        console.log("user",user);
         if(user){
            throw new Error("Already user exits.")
         }

        if (!email) {
            throw new Error("Please provide email");
        }

        if (!password) {
            throw new Error("Please provide password");
        }

        if (!name) {
            throw new Error("Please provide name");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const payload = {
          ...req.body,
            role: "GENERAL",
            password : hashPassword
        };

        const userData = new userModel(payload);

        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        });
    }
}

module.exports = userSignUpController;