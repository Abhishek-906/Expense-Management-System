const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
    try {
        const { name, amount, description, type, userId, categoryId } = req.body;
        const newTransaction = new Transaction({ name, amount, description, type, userId, categoryId });

        await newTransaction.save();
        res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate("userId", "username").populate("categoryId", "name");
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
