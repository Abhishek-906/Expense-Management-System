require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../model/User'); 
const Transaction = require('../model/TransactionModel');
const connectDB = require('../../connectDB');


connectDB();

const demoData = async () => {
    try {
        await User.deleteMany();
        await Transaction.deleteMany();

        console.log("Existing data cleared.");

        const user = await User.create({
            username: "demouser",
            email: "demo@example.com",
            password: "demoHashPassword", 
            role: "client",
            monthlySalary: 5000
        });

        await Transaction.create([
            {
                userId: user._id,
                category: "food",
                amount: 50,
                type: "expense",
                description: "Lunch"
            },
            {
                userId: user._id,
                category: "salary",
                amount: 5000,
                type: "income",
                description: "Monthly salary"
            }
        ]);

        console.log("insert successful");
        process.exit();
    } catch (error) {
        console.error("insert failed:", error);
        process.exit(1);
    }
};

demoData();



