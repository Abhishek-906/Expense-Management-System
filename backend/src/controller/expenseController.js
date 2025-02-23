
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidPattern  = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const {format}= require('date-fns');

const User = require('../model/User');
const mongoose = require('mongoose');



//FOR CREATING ACCOUNT

const register = async (req, res) => {
    let { username, email, password, confirmPassword ,  role } = req.body;

   role = role.toLowerCase();

    if (!username || !email || !password || !confirmPassword || !role) {
        return res.status(200).json({ message: "Give all field informations , then you got register." });
    }


    if (role !=='admin' &&role !=='client') {
        return res.status(200).json({ message: "Role must be either 'admin' or 'client'." });
    }

    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
        return res.status(200).json({ message: "User is present, try another name!" });
    }
    if (!emailValidPattern.test(email)) {
        return res.status(400).json({ message: "Email format is not correct" });
    }
    
    if(password!=confirmPassword){
        return res.status(400).json({message:"Your password is not matching with confirmPassword"})
    }


      if (!PasswordPattern.test(password)) {
          return res.status(400).json({ message: 'Password does not match the required pattern' });
      }

    if (role === 'admin') {
        const isAdminPresent = await User.findOne({ role: 'admin' });
        if (isAdminPresent) {
            return res.status(200).json({ message: "Admin already exists. You cannot register as admin." });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {   
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully", username: newUser.username });
    } catch (err) {
        return res.status(200).json({ message: "Error during registration", error: err.message });
    }
};








const editValue = async (req, res) => {
    const { username, password, cat, prod, amount } = req.body;

    if (!username || !password || !cat || !prod || !amount) {
        return res.status(400).json({ message: "Some details are missing" });
    }

    if (!['food', 'basic', 'other'].includes(cat)) {
        return res.status(400).json({ message: "Invalid category" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const nowProductBudget = user.category[cat].totalCategorySpent + amount;
        const totalCategoryBudget = user.category[cat].productBudget;

        const nowDate = new Date();  
        const settedDate = user.budget.length > 0 ? user.budget[0].tillDate : null;

        if (!settedDate || new Date(settedDate) < nowDate) {
            return res.status(400).json({ message: "Your budget date has expired" });
        }

        if (nowProductBudget > totalCategoryBudget) {
            const amountReq = nowProductBudget - totalCategoryBudget;
            return res.status(400).json({ message: `You are out of budget, You need ${amountReq} rupees more` });
        }

        const leftBudget = totalCategoryBudget - nowProductBudget;

        if (!user.category[cat].product) {
            user.category[cat].product = [];
        }

        user.category[cat].product.push({
            name: prod,
            amountSpend: amount
        });

        user.category[cat].totalCategorySpent += amount;

        const dateRN = format(new Date(), 'dd/MM/yyyy');

        user.Transaction.push({             //ch
            name: prod,
            amount: amount,
            type : "expense",
            dateRightNow: dateRN
        });

        await user.save(); 

        return res.status(200).json({
            message: `Task performed successfully, Budget left: ${leftBudget} rupees`,
            username: user.username
        });
    } catch (err) {
        return res.status(500).json({ message: "Error occurred during update", err: err.message });
    }
};







//delete

const del = async (req, res) => {
    const { myusername , password } = req.body;
    try {
    
            const truePasswordOfUsername = await User.findOne({ username: myusername }, { password: 1 });
            const passwordMatchClient = await bcrypt.compare(password, truePasswordOfUsername.password);

            if (passwordMatchClient) {
                const deleteUser = await User.deleteOne({ username: myusername });
                if (deleteUser.deletedCount > 0) {
                    console.log("User deleted successfully.");
                    return res.status(200).json({ message: "Your account has been deleted successfully" });
                } else {
                    return res.status(404).json({ message: "User not found" });
                }
            } else {
                return res.status(401).json({ message: "Your password is incorrect" });
            }
        
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};







const setBudget = async (req, res) => {
    try {
        const { username, password, cat, categoryBudget, date } = req.body;

        if (!username || !password || !cat || !categoryBudget || !date) {
            return res.status(400).json({ message: "Any information is missing" });
        }

        const PasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const isPasswordCorrect = PasswordPattern.test(password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password must be at least 8 characters long and contain both letters and numbers" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.budget.length > 0) {
            user.budget[0].tillDate = date; 
        } else {
            return res.status(400).json({ message: "No existing budget found for this user" });
        }

        
        const mainBudget = user.budget.reduce((total, p) => total + (p.budgetAmount || 0), 0);  

        let currentCategoryBudget = user.category[cat]?.productBudget;
        if (currentCategoryBudget === undefined) {
            return res.status(400).json({ message: `Category ${cat} not found` });
        }

        currentCategoryBudget += categoryBudget;
        user.category[cat].productBudget = currentCategoryBudget;

        const threeCategoryBudget = user.category.food.productBudget + user.category.basic.productBudget + user.category.other.productBudget;

        if (threeCategoryBudget > mainBudget) {
            return res.status(400).json({
                message: `Your total category spending exceeds the main budget. Your main budget is ${mainBudget}, but your spending is ${threeCategoryBudget}`
            });
        }

    //  const type = "expense";
    const dateRN = format(new Date(), 'dd/MM/yyyy');

        user.Transaction.push({                          //ch
            name: "Budget",
            amount: categoryBudget,
            type : "income",                 //income
            dateRightNow: dateRN
        });




        await user.save();

        return res.status(202).json({
            message: `You added ${categoryBudget} to your ${cat} budget. Your new ${cat} budget is ${currentCategoryBudget}, and the budget is valid until ${date}.`
        });

    } catch (err) {
        return res.status(400).json({ message: "There is something wrong", error: err.message });
    }
};





const about = async (req, res) => {
    try {
        const { password, username } = req.body;

        if (!password || !username) {
            return res.status(400).json({ message: "Any info is missing" });
        }

        const PasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const isPasswordCorrect = PasswordPattern.test(password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Your password syntax is wrong" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User is not present in database" });
        }

        const foodCategoryValue = user.category.food;
        const basicCategoryValue = user.category.basic;
        const otherCategoryValue = user.category.other;

        const foodList = foodCategoryValue.product.map(p => p.name).join(',');

        const foodAmountSpent = foodCategoryValue.product.reduce((a, p) => a + p.amountSpend, 0);

        const foodBudget = foodCategoryValue.productBudget;
        
        const basicList = basicCategoryValue.product.map(p => p.name).join(',');
        const basicAmountSpent = basicCategoryValue.product.reduce((a, p) => a + p.amountSpend, 0);

        const basicBudget = basicCategoryValue.productBudget;
      
        const otherList = otherCategoryValue.product.map(p => p.name).join(',');

        const otherAmountSpent = otherCategoryValue.product.reduce((a, p) => a + p.amountSpend, 0);

        const otherBudget = otherCategoryValue.productBudget;
       

        const mainBudget = user.budget.reduce((a,p)=>p.budgetAmount+a , 0) ;

        const information = `The Client ${username} Allocated the Budget (For Food Category: ${foodBudget} and he/she spent ${foodAmountSpent}. For Basic Category: ${basicBudget} and he/she spent ${basicAmountSpent}. For Other Category: ${otherBudget} and he/she spent ${otherAmountSpent}). And OverallBudget is ${mainBudget}`;

        return res.status(202).json({ message: information });

    } catch (err) {
        console.log("Something went wrong", err.message);
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};



const assignMainBudget = async (req, res) => {
    try {
        const { username, password, mainBudget } = req.body;

        if (!username || !password || !mainBudget) {
            return res.status(400).json({ message: "Any value is not there" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        
            user.budget.push({
                budgetAmount: mainBudget,
                tillDate: new Date() 
            });
        


            const dateRN = format(new Date(), 'dd/MM/yyyy');

            user.Transaction.push({                        //ch
                name: "MainBudget",
                amount: mainBudget,
                type : "budget",                    //income
                dateRightNow: dateRN
            });
    



        await user.save();

        return res.status(200).json({ message: `Main budget updated to ${mainBudget}` });

    } catch (err) {
        return res.status(400).json({ message: "Something went wrong", error: err.message });
    }
};







//For LOGIN

const login = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password) {
        return res.status(200).json({ message: "Username and password are required" });
    }

    try {
        const isItAdmin = await User.findOne({ username });

        if (isItAdmin && isItAdmin.role === 'admin') {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(204).json({ message: "User not found" });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(201).json({ message: "Password is incorrect" });
            }

            const Alltheuserslist = await User.find();
            if (!Alltheuserslist || Alltheuserslist.length === 0) {
                return res.status(404).json({ message: "No users found in the database" });
            }


            const one = {
            
                userid: user._id,
                username: user.username,
            };
    
            const token = jwt.sign(one, process.env.SECRET_KEY, { expiresIn: '30s' });
    
            return res.status(200).json({
                message: "User authenticated done",
                token: token,
                user: Alltheuserslist
            });
        }


        const user = await User.findOne({ username });
        if (!user) {
            return res.status(204).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(201).json({ message: "Password is incorrect" });
        }

        const one = {
            userid: user._id,
            username: user.username,
        };

        const token = jwt.sign(one, process.env.SECRET_KEY, { expiresIn: '30s' });

        return res.status(200).json({
            message: "User authenticated done",
            token: token,
            user: user
        });

    } catch (err) {
        return res.status(201).json({ message: "Error occurred", error: err.message });
    }
};



const track = async (req, res) => {
    try {
        const { username, password, type } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        let productDetails = [];

        if (type === "income") {      //income
            productDetails = user.Transaction.filter(p => p.type === 'income');     //ch // income
        }

        if (type === "expense") {
            productDetails = user.Transaction.filter(p => p.type === 'expense'); //ch
        }

        if (type === "all") {
            productDetails = user.Transaction;      //ch
        }

        if (productDetails.length === 0) {
            return res.status(404).json({ message: "No records found" });
        }

        return res.status(200).json({
            message: "Values are",
            Transaction : productDetails
        });

    } catch (err) {
        return res.status(400).json({ message: "Error occurred", error: err.message });
    }
};




module.exports = { register, login , editValue , del , setBudget  , about , assignMainBudget , track};
















