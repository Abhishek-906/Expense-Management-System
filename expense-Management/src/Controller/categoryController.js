const Category = require("../models/Category");

exports.addCategory = async (req, res) => {
    try {
        const { name, type } = req.body;

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) return res.status(400).json({ message: "Category already exists" });

        const newCategory = new Category({ name, type });

        await newCategory.save();
        res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
