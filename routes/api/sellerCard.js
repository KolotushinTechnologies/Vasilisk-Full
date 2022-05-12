// Import Engine
const express = require("express");
const router = express.Router();

// Import Middlewares
const auth = require("../../middleware/auth");

// Import Controllers
const {
  createProductCard,
  getMySellerCard,
  getMyProductCards,
  addProductToBasket,
  addProductToFavorites,
  getProductCards,
  getProductCard,
  getSellerCardByUserId
} = require("../../services/sellerCard");

// @route    POST api/seller-card/create
// @desc     Create New Product Card
// @access   Private
router.get("/create", createProductCard);

// @route    GET api/seller-card/me
// @desc     Get current users Seller Card
// @access   Private
router.get("/me", auth, getMySellerCard);

// @route    GET api/product-card/my-basket
// @desc     Get My Product Cards (My Basket)
// @access   Private
router.get("/my-basket", auth, getMyProductCards);

// @route    GET api/product-card/add-product-to-basket/:product_card
// @desc     Add product to basket
// @access   Private
router.post("/add-product-to-basket/:product_card", auth, addProductToBasket);

// @route    GET api/product-card/add-product-to-favorites/:product_card
// @desc     Add product to favorites
// @access   Private
router.post(
  "/add-product-to-favorites/:product_card",
  auth,
  addProductToFavorites
);

// @route    GET api/seller-card/all
// @desc     Get all sellers cards
// @access   Public
router.get("/all", getProductCards);

// @route    GET api/seller-card/:product_card
// @desc     Get Product Card By ID
// @access   Public
router.get("/:product_card", getProductCard);

// @route    GET api/seller-card/user/:user_id
// @desc     Get seller card by user ID
// @access   Public
router.get("/user/:user_id", getSellerCardByUserId);

module.exports = router;
