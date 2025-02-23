const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValPattern  = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const {format}= require('date-fns');
const User = require('../model/User');
const mongoose = require('mongoose');
const Transaction = require("../model/TransactionModel")
const alphabet = /^[A-Za-z]+$/;

   

const register = async (req, res) => {
    try {
        const { username, email, password, fullname, role, monthlySalary } = req.body;
        


        if (!username||!email ||!password|| !fullname || !role || monthlySalary < 0|| monthlySalary === undefined) {
            return res.status(400).json({ message: " provide all info." });
        }
    
        const isUserExist = await User.findOne({ username });
        if (isUserExist) {
            return res.status(400).json({ message: "User already there in DB, try another !" });
        }
    
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: " already exists, try  one more !" });
        }
    
        if (!alphabet.test(username)) {
            return res.status(400).json({ message: "Username  only have alphabets." });
        }
    
        if (!emailValPattern.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
    
        if (!PasswordValid.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters and contain at least one number , letter.' });
        }
    
        if (role === 'admin') {
            const isAdminAlreadyExist = await User.findOne({ role: 'admin' });
            if (isAdminAlreadyExist) {
                return res.status(400).json({ message: "Admin is already present . Only one admin is allow." });
            }
        }


     
        const hashedPassword = await bcrypt.hash(password, 10);



        const newUser = new User({ username, email, password: hashedPassword, fullname, role, monthlySalary });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });


        if (!email || !password) {
            return res.status(400).json({ message: "Email and password is imp to give." });
        }
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid values." });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });


        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const editUser = async(req , res)=>{
    try{
    const {  username , email , password , role , monthlySalary } = req.body ;

    const userId = req.user.userId;

    if(!userId){
        return res.status(400).json({message : "invalid token"});
    }

    if (!username||!email ||!password||  !role || monthlySalary < 0|| monthlySalary === undefined) {
        return res.status(400).json({ message: " provide all info." });
    }


    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
        return res.status(400).json({ message: " already exists, try  one more !" });
    }

    if (!alphabet.test(username)) {
        return res.status(400).json({ message: "Username  only have alphabets." });
    }

    if (!emailValPattern.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    if (!PasswordValid.test(password)) {
        return res.status(400).json({ message: 'Password not less than 8 characters and contain one number atleast also letter too.' });
    }


   if(!userId){
    return res.status(400).json({message :"USer is not found"});
   }


 
const targetUser = await User.findById(userId);

targetUser.username = username ;
targetUser.email = email ;
targetUser.password = password ;
targetUser.role = role ;
targetUser.monthlySalary =  monthlySalary ;


 await targetUser.save() ;
}catch(err){
    return res.status(200).json({message : "save value successfully"});
}
}



const  monthlyBudget = async (req, res) => {
    try {
        const { monthlyBudget  } = req.body;
        
        const userId = req.user.userId;

          if(!userId){
            return res.status(400).json({message : "Invalid token is given"});
          }
          
        if (!monthlyBudget || monthlyBudget < 0) {
            return res.status(400).json({ message: "Invalid budget amount" });
        }
       


        const target = await User.findById(userId);
        if (!target) {
            return res.status(404).json({ message: "User not found" , error : err.message });
        }


        target.monthlyBudget =  monthlyBudget ; 
        await target.save();

        res.json({ message: "Monthly budget updated successfully!" , update : monthlyBudget   });


        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const deleteUserById = async (req, res) => {
    try {
        const userId = req.user.userId;  
        
      
        if (!userId) {
            return res.status(400).json({ message: "User Id is important to give" });
        }


        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid format of userIdForDelete " });
        }

        const user = await User.findByIdAndDelete(userId);
        console.log("user" , user);
        if (!user) {
            return res.status(404).json({ message: "User is not found" });
        }

        return res.status(200).json({ message: "User is deleted" });
    } catch (err) {
        return res.status(500).json({ message: "Error occurred", error: err.message });
    }
};

const dashboard = async(req , res)=>{
    try{
    const userId = req.user.userId ;
  if(!userId){
    return res.status(400).json({message : "invalid token"});
  }
    const categories = [
        "food" , "bills" , "salary" , "other"
    ]
    let answer = {} ;
    let  overAllAmount = 0 ;

    for(let category of categories){
    const  transactions = await Transaction.find({ userId ,category });
    const totalAmount = transactions.reduce((Amount , p) => Amount + (p.amount || 0), 0) ;

     answer[category]= { Amount : totalAmount };
     overAllAmount += totalAmount
    }

 


    for(let category of categories){
        if(overAllAmount){
            answer[category]["percentage"] = Math.floor(((answer[category].Amount)/overAllAmount)*100) ;
        }else{
            answer[category]["percentage"] = 0 ;  
        }
    }
    


    res.status(202).json({message : "succesfully" , data: answer})
}
    catch(err){
        return res.status(400).json({message : "error occurr" , error : err.message });
    }
}

module.exports = { login, register, editUser , monthlyBudget , deleteUserById , dashboard};












