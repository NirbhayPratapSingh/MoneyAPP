const userDetails = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

//SIGNUP
const userRegistration = async(req, res) => {
    const { email, firstname, password } = req.body;

    if (!firstname || !email || !password  ){
        return res.status(422).send("Please Add all fields")
    }
    userDetails.findOne({email}).then(async(savedUser)=>{
        if (savedUser) {
            return res.status(422).json({message:"User already exists with that email"})
        }
        const ip = req.ip;
        const hashedpassword = await bcrypt.hash(password, 12);
        const result = await userDetails.create({
            email,
            firstname,
            password: hashedpassword,
            ip
        })
        res.status(200).json({result, message:'User saved successfully'})
    }).catch(err => res.status(500).json({message:"User.findOne savedUser part error => ", err} ))
}

//LOGIN
const userLogin = async(req, res) => {
    const {email, password} = req.body;
    if( !email || !password){
        return res.status(422).json({error: "All fields required"});
    }
    userDetails.findOne({email}).then(async(validation)=>{
        const PasswordVarification = await bcrypt.compare(password,validation.password)
        if(PasswordVarification){
            const token = jwt.sign({ id: validation._id, email:validation.email}, "arshad", { expiresIn: "1h" });
            const ResponseToFrontEnd = {token, email}
            return res.status(200).json({ResponseToFrontEnd,message:"Account Verified"})
        }else{
            return res.status(422).json({message: "Verification Failed"})
        }           
    }).catch((err)=>res.status(422).json({message: "User not found, Please Sign-Up"}))
}

module.exports = { userRegistration, userLogin }