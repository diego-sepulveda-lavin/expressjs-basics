// import express
const express = require('express');

// import controllers
const adminController = require('../controllers/admin');

// express router
const router = express.Router();

// routes
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.getProducts);

module.exports = router;
