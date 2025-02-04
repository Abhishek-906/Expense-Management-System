const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const transactionController = require("./controllers/transactionController");
const categoryController = require("./controllers/categoryController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.post("/transaction", transactionController.addTransaction);
router.get("/transactions", transactionController.getTransactions);
router.delete("/transaction/:id", transactionController.deleteTransaction);

router.post("/category", categoryController.addCategory);
router.get("/categories", categoryController.getCategories);

module.exports = router;
