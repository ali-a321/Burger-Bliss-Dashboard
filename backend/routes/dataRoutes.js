const express = require('express')
const router = express.Router()
const {getTotalOrders, getTotalSales, getTotalItems, getOrderQuantityOfEachItem,
    getAverageOrderValue,getSalesByCategory,getTopSellingItems,getOrdersByCity,
    getOrdersByDelPick,getCostOfItem, getSalesPerHr } = require("../controllers/dataController")
const db = require('../db');

//Middleware to attach db object to req object
const attachDb = (req, res, next) => {
    req.db = db;
    next();
  };
router.use(attachDb); 

// burgerbliss/
router.get('/data/get/totalOrders', getTotalOrders);
router.get('/data/get/totalSales', getTotalSales);
router.get('/data/get/totalItems', getTotalItems);
router.get('/data/get/orderQuantityOfEachItem', getOrderQuantityOfEachItem);
router.get('/data/get/averageOrderValue', getAverageOrderValue);
router.get('/data/get/salesByCategory', getSalesByCategory);
router.get('/data/get/topSellingItems', getTopSellingItems);
router.get('/data/get/salesPerHr', getSalesPerHr);
router.get('/data/get/ordersByCity', getOrdersByCity);
router.get('/data/get/ordersByDelPick', getOrdersByDelPick);
router.get('/data/get/costOfItem', getCostOfItem);


module.exports = router