
const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  category: { 
    type: String, 
    enum: ["food", "bills", "salary", "other"], 
    required: true },

  amount: { 
    type: Number, 
    required: true 
  },
  type: {
     type: String, 
     enum: ["income", "expense"], 
     required: true 
    },
  description: { 
    type: String 
  },
  createdAt: {
     type: Date, 
     default: Date.now 
    }
}
);

 const Transaction = mongoose.model("Transaction", TransactionSchema);

  module.exports = Transaction;







  











/*

const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
    name : {
      type: String,
      required:true
    },
    amount:{
      type: Number,
      required:true,
    },
    description:{
      type:String
    },
    type:{
       type:String,
       enum:['income' , 'expense'],
       required:true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
   
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }},
    
    { timeStamps:true}
);

 const Transaction = mongoose.model("Transaction", TransactionSchema);

  module.exports = Transaction;






 
*/






























