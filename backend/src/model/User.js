
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
         unique: true 
        },
    email: { 
        type: String, 
        required: true,
         unique: true
        },
    password: { 
        type: String,
         required: true 
        },
    role: { type: String,
         enum: ["user", "admin"], default: "user" 
        },

    monthlySalary: {
         type: Number 
        },
    monthlyBudget: { 
        type: Number, 
        default: 0 
    }, 
    monthlyBudgetLeft:{
        type: Number,
        default:0
    },
    wallet: {
        type: Number,
        default: 0,
      }
});

module.exports = mongoose.model("User", userSchema);










/*
























const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    username : {
        type:String , 
        required: true,
        unique: true
    } ,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required:true,
        enum:['admin' , 'client'],
        default:'client'
    },
    MonthlySalary:{
        type:Number,
        required: true
    },
    MouthlyBudget:{
        type:Number,
        required:true,
    },

}, { timestamps: true });


module.exports = mongoose.model('User' , userSchema );












*/
