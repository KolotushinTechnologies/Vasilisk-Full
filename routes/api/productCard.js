// Import Engine
const express = require("express");
const router = express.Router();

// Import Middlewares
const auth = require("../../middleware/auth");

// Import Controllers
const {
  createProductCard,
  getMyProductCards,
  addProductToBasket,
  deleteMyBasketProductCard,
  addProductToFavorites,
  getMyFavorites,
  deleteMyFavoriteProductCard,
  getProductCards,
  getProductCard
} = require("../../services/productCard");

// @route    POST api/product-card/create
// @desc     Create New Product Card
// @access   Private
router.get("/create", createProductCard);

// @route    GET api/product-card/my-basket
// @desc     Get My Product Cards (My Basket)
// @access   Private
router.get("/my-basket", auth, getMyProductCards);

// @route    POST api/product-card/add-product-to-basket/:product_card
// @desc     Add product to basket
// @access   Private
router.post("/add-product-to-basket/:product_card", auth, addProductToBasket);

// @route    POST api/product-card/add-product-to-favorites/:product_card
// @desc     Add product to favorites
// @access   Private
router.post(
  "/add-product-to-favorites/:product_card",
  auth,
  addProductToFavorites
);

// @route    POST api/product-card/my-favrites
// @desc     Get Favorites Product Cards
// @access   Private
router.get("/my-favorites", auth, getMyFavorites);

// @route    DELETE api/product-card/delete-product-to-basket/:product_card
// @desc     Remove item from cart
// @access   Private
router.delete(
  "/delete-product-to-basket/:product_card",
  auth,
  deleteMyBasketProductCard
);

// @route    DELETE api/product-card/delete-product-to-favorites/:product_card
// @desc     Remove product from favorites
// @access   Private
router.delete(
  "/delete-product-to-favorites/:product_card",
  auth,
  deleteMyFavoriteProductCard
);

// @route    GET api/product-card/all
// @desc     Get all product cards
// @access   Public
router.get("/all", getProductCards);

// @route    GET api/product-card/:product_card
// @desc     Get Product Card By ID
// @access   Public
router.get("/:product_card", getProductCard);

module.exports = router;
