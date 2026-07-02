const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");

// Create New Order
exports.newOrder = asyncErrorHandler(async (req, res, next) => {
  const order = normalizeOrder(req.body, `pay-${Date.now()}`);
  runtimeOrders.push(order);

  res.status(201).json({ success: true, order });
});

exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {
  const order = [...runtimeOrders, ...transactions].find((item) => item.id === req.params.id);

  if (!order) {
    return next(new ErrorHandler("Business order not found", 404));
  }

  res.status(200).json({ success: true, order });
});

exports.myOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = [...runtimeOrders, ...transactions.filter((item) => item.type === "payroll")];
  res.status(200).json({ success: true, orders });
});

exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = [...runtimeOrders, ...transactions.filter((item) => item.type === "payroll")];
  const totalAmount = orders.reduce((sum, item) => sum + (item.amount || 0), 0);

  res.status(200).json({ success: true, orders, totalAmount });
});

exports.updateOrder = asyncErrorHandler(async (req, res, next) => {
  const order = [...runtimeOrders, ...transactions].find((item) => item.id === req.params.id);
  if (!order) {
    return next(new ErrorHandler("Business order not found", 404));
  }

  order.status = req.body?.status || order.status;
  order.note = req.body?.note || order.note;

  res.status(200).json({ success: true, order });
});

exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
  const index = runtimeOrders.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return next(new ErrorHandler("Business order not found", 404));
  }

  runtimeOrders.splice(index, 1);
  res.status(200).json({ success: true, message: "Payroll order removed" });
});
