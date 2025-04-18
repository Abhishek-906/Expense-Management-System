const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const mongoose = require('mongoose');

const User = require('../model/User');
const Transaction = require("../model/TransactionModel");

const emailValPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordValid = /^(?=.*[0-9]).{6,}$/
const alphabet = /^[A-Za-z]+$/;

const register = async (req, res) => {
    try {
        const { username, email, password, fullname, role, monthlySalary } = req.body;

        if (!username || !email || !password || !fullname) {
            return res.status(400).json({ message: "Provide all required information." });
        }

        const isUserExist = await User.findOne({ username });
        if (isUserExist) {
            return res.status(400).json({ message: "Username already taken. Try another!" });
        }

        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists. Try another!" });
        }

        if (role === 'admin') {
            const isAdminAlreadyExist = await User.findOne({ role: 'admin' });
            if (isAdminAlreadyExist) {
                return res.status(400).json({ message: "Only one admin is allowed." });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fullname,
            role,
            monthlySalary
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: `Some error occurred ${error}`});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        const user = await User.findOne({ email });

        console.log("user user ",email)
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ 
            message: "Login successful" , 
            token,
            user: {
                name: user.username, 
                email: user.email,
                role: user.role
            } });
    } catch (error) {
        res.status(500).json({ message: `Internal server error.${error}`});
    }
};

const editUser = async (req, res) => {
    try {
        const { username, email, password,  monthlySalary } = req.body;
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }

        if (!username || !email || !password  || monthlySalary < 0) {
            return res.status(400).json({ message: "Provide all required information." });
        }

        if (!alphabet.test(username)) {
            return res.status(400).json({ message: "Username must contain only alphabets." });
        }

        if (!emailValPattern.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        if (!passwordValid.test(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one number and one letter." });
        }

        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        targetUser.username = username;
        targetUser.email = email;
        targetUser.password = await bcrypt.hash(password, 10);
        targetUser.monthlySalary = monthlySalary;

        await targetUser.save();

        res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
        res.status(500).json({ message: `Error occurred ${error}` });
    }
};

const monthlyBudget = async (req, res) => {
    try {
        const { monthlyBudget } = req.body;
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }

        if (!monthlyBudget || monthlyBudget < 0) {
            return res.status(400).json({ message: "Invalid budget amount" });
        }

        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        targetUser.monthlyBudget = monthlyBudget;
        targetUser.monthlyBudgetLeft = monthlyBudget;
        await targetUser.save();

        res.status(200).json({ message: "Monthly budget updated successfully!", updatedBudget: monthlyBudget });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format." });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
};


const getUserOverview = async (req, res) => {
    try {
      const userId = req.user?.userId;
  
      if (!userId) return res.status(400).json({ message: "Invalid token" });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const monthlyBudget = user.monthlyBudget;
      const now = new Date();
      const firstDayOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  
      const [thisMonthExpensesDocs, lastMonthExpensesDocs, thisMonthIncomeDocs, lastMonthIncomeDocs] =
        await Promise.all([
          Transaction.find({ userId, type: "expense", createdAt: { $gte: firstDayOfThisMonth, $lte: lastDayOfThisMonth } }),
          Transaction.find({ userId, type: "expense", createdAt: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth } }),
          Transaction.find({ userId, type: "income", createdAt: { $gte: firstDayOfThisMonth, $lte: lastDayOfThisMonth } }),
          Transaction.find({ userId, type: "income", createdAt: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth } }),
        ]);
  
      const sumAmount = (docs) => docs.reduce((sum, tx) => sum + (tx.amount || 0), 0);
  
      const thisMonthExpenses = sumAmount(thisMonthExpensesDocs);
      const lastMonthExpenses = sumAmount(lastMonthExpensesDocs);
      const thisMonthIncome = sumAmount(thisMonthIncomeDocs);
      const lastMonthIncome = sumAmount(lastMonthIncomeDocs);
  
      const recentTransactions = await Transaction.find({ userId })
        .sort({ createdAt: -1 })
        .limit(3)
        .select("type category amount createdAt");
  
      const categories = ["food", "bills", "salary", "other"];
      const analytics = {};
      let overallAmount = 0;
  
      for (let category of categories) {
        const transactions = await Transaction.find({ userId, category });
        const totalAmount = sumAmount(transactions);
  
        analytics[category] = { amount: totalAmount };
        overallAmount += totalAmount;
      }
  
      for (let category of categories) {
        analytics[category]["percentage"] = overallAmount
          ? Math.floor((analytics[category].amount / overallAmount) * 100)
          : 0;
      }
    
      analytics["monthlyBudget"] = { amount: monthlyBudget };

      analytics["thisMonthExpenses"] = { amount: thisMonthExpenses };
      analytics["lastMonthExpenses"] = { amount: lastMonthExpenses };
      analytics["thisMonthIncome"] = { amount: thisMonthIncome };
      analytics["lastMonthIncome"] = { amount: lastMonthIncome };
  
      analytics["lastTrans"] = recentTransactions[0] || null;
      analytics["secondlastTrans"] = recentTransactions[1] || null;
      analytics["thirdLastTrans"] = recentTransactions[2] || null;
  
    
      analytics["budgetLeft"] = user.monthlyBudgetLeft;
  
      res.status(200).json({ message: "Success", data: analytics });
    } catch (error) {
      console.error("Dashboard Error:");
      res.status(500).json({ message: "Error occurred",error: error.message });
    }
  
  


};

module.exports = { login, register, editUser, monthlyBudget, deleteUserById, getUserOverview };













