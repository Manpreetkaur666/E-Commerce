const express = require('express');
const { getAllProducts,
     createProduct, 
     updateProduct, 
     deleteProduct, 
     getProductDetails, 
     addProductReview, 
     getProductReviews, 
     deleteProductReview, 
     getAdminProducts } = require('../controllers/productController');
const { authenticateuser, authorizeRole} = require('../middleware/auth');
const router = express.Router();


router.route("/products").get(getAllProducts)

router.route("/admin/products").get(authenticateuser, authorizeRole("admin"), getAdminProducts);
router.route("/admin/products/new").post(authenticateuser,authorizeRole("admin"), createProduct)
router.route("/admin/products/:id")
.put(authenticateuser,authorizeRole("admin"), updateProduct)
.delete(authenticateuser,authorizeRole("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails)
router.route("/review").put(authenticateuser,addProductReview)

router.route("/reviews")
.get(getProductReviews)
.delete(authenticateuser,deleteProductReview);




module.exports = router