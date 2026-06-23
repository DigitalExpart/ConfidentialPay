const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const { services } = require("../data/businessData");

function findService(id) {
  return services.find((item) => item.id === id) || null;
}

exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    products: services,
    productsCount: services.length,
    resultPerPage: services.length,
    filteredProductsCount: services.length,
  });
});

exports.getProducts = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ success: true, products: services });
});

exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
  const product = findService(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Service Not Found", 404));
  }
  res.status(200).json({ success: true, product });
});

exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ success: true, products: services });
});

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = {
    id: `svc-${Date.now()}`,
    name: req.body?.name || "New ConfidentialPay Service",
    category: req.body?.category || "Operations",
    description: req.body?.description || "Configured from the admin console",
    price: req.body?.price || 0,
    active: true,
  };
  res.status(201).json({ success: true, product });
});

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  const existing = findService(req.params.id);
  if (!existing) {
    return next(new ErrorHandler("Service Not Found", 404));
  }
  res.status(200).json({ success: true, product: { ...existing, ...req.body } });
});

exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Service removed from the business catalog" });
});

exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Review queued for moderation" });
});

exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ success: true, reviews: [] });
});

exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Review removed" });
});
