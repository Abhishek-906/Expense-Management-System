
const User = require('../model/User'); 
const Transaction = require('../model/TransactionModel'); 
const mongoose = require('mongoose');


const addTrans = async (req, res) => {
  try {
    const { amount, category, type } = req.body;
    const userId = req.user.userId;
  
    if(!userId){
        return res.status(400).json({message : "Invalid User"});
    }   
    const user = await User.findById(userId);
   if (!user) return res.status(404).json({ message: "User not found" });

    const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
 
    const transactions = await Transaction.find({
      userId: userId,
      createdAt: {$gte : thisMonth}
  });



    let totalExpenses = transactions.reduce((total, transaction) => total + transaction.amount, 0);

    let bd =  user.monthlyBudget;
   console.log("budget" , user.monthlyBudget);
    let total  ;
    if(type==='expense'){   
       total = Number(totalExpenses) + Number(amount)
    }else if(type==='income'){
      user.monthlyBudget = Number(user.monthlyBudget)+ Number(amount);
      bd = Number(user.monthlyBudget);

      await user.save();
    }else{
        return res.status(404).json({message : "Invalid Value"});
    }
    

    if (user.monthlyBudget && total > bd) {
        
        return res.status(400).json({ message: "Budget limit exceeded!" });
    }
   
    const transaction = new Transaction({ userId, amount, category, type });
    await transaction.save();

    res.status(201).json({ message: "Transaction Done" , transaction , info : total , bd});
} catch (error) {
    res.status(500).json({ error: error.message });
}
};



const getTrans = async (req, res) => {
    try {
        const { type, datevalue } = req.body; 

        const userId = req.user.userId; 
  
        if(!userId){
            return res.status(400).json({message : "invalid token"});
        }

  
        const targetuser = await User.findById(userId);
        if (!targetuser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        let query = {
            userId: new mongoose.Types.ObjectId(userId),
        };
        if(type!=="all"){
             query = {
                userId: new mongoose.Types.ObjectId(userId),
                type: type
            };
        }
       
  
        const today = new Date();    
        
        if (datevalue === 'lastmonth') {
            const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); 
            const thisMonth = new Date(today.getFullYear(), today.getMonth(), 0); 
            query.createdAt = { $gte: prevMonth, $lt: thisMonth };
        } else {
            const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1); 
            query.createdAt = { $gte: thisMonth };
        }
  
        const transactions = await Transaction.find(query)
  
        res.status(200).json({
            message: "Transactions success",
            transactions
        });
  
    } catch (err) {
        return res.status(400).json({
            message: "Error occurred during transactions",
            error: err.message
        });
    }
  };

const deleteTrans = async (req, res) => {
  try {
      const userId = req.user.userId;  
      let transactionId = req.params.id;  

      if(!userId){
        return res.status(400).json({message : "invalid token"});
    }
     

      if (!mongoose.Types.ObjectId.isValid(transactionId)) {
          return res.status(400).json({ message: "Wrong transaction id format" });
      }

      const transaction = await Transaction.findOne({ _id: transactionId, userId:userId });

      console.log("transationsss" ,transaction )

     
      if (!transaction) {
          return res.status(404).json({ message: "Transaction not found or not have relation with the user", id: transactionId, userId: userId });
      }

      const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

      res.status(200).json({
          message: "Transaction deleted successfully",
          transaction: deletedTransaction
      });

  } catch (err) {
      return res.status(400).json({ message: "Some error occurred", error: err.message });
  }
};

const editTrans = async (req, res) => {
  try {
      const { newAmount, newCategory, newType } = req.body;

      const userId = req.user.userId;  

      if(!userId){
        return res.status(400).json({message : "invalid token"});
    }


      const transactionId = req.query.id;  

       console.log("transaction number i got is:" ,transactionId );

      console.log("User Id", userId);
      console.log("Transaction Id", transactionId);

     
      if (!userId) {
          return res.status(400).json({ message: "userid is not found" });
      }

      if (!mongoose.Types.ObjectId.isValid(transactionId)) {
          return res.status(400).json({ message: "Invalid transaction id" });
      }

      const targetTrans = await Transaction.findOne({
          _id: transactionId,
          userId: userId  
      });

              console.log("transaction number i got is:" ,transactionId );

      if (!targetTrans) {
          console.log("Transaction not found ", userId);
          return res.status(404).json({ message: "Transaction not found" });
      }

      const prev = {
          amount: targetTrans.amount,
          category: targetTrans.category,
          type: targetTrans.type
      };

      if (newAmount !== undefined) {
          targetTrans.amount = newAmount;
      }
      if (newCategory !== undefined) {
          targetTrans.category = newCategory;
      }
      if (newType !== undefined) {
          targetTrans.type = newType;
      }

      await targetTrans.save();

      return res.status(200).json({
          message: "Transaction update success",
          previousData: prev,
          updatedData: targetTrans
      });

  } catch (err) {
      return res.status(400).json({ message: "Something is wrong", error: err.message });
  }
};
const addImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
     const { username, email , password} = req.body;

let user = await User.findOne({ username });

if (!user) {
    // Create a new user if not found
    user = new User({ username, email , password });
    await user.save();
}

        console.log("Uploaded file:", req.file);

        const { filename, path, mimetype, size } = req.file;

        return res.status(200).json({
            message: "Image uploaded successfully",
            file: { filename, path, mimetype, size }
        });

    } catch (error) {
        console.error("Error in addImage:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




module.exports = {addTrans , getTrans , deleteTrans , editTrans , addImage};









