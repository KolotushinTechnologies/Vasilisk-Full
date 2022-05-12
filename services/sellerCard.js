// Import Models
const ProductCardModel = require("../models/ProductCard");
const BasketModel = require("../models/Basket");
const FavoritesModel = require("../models/Fvaorites");

// @route    POST api/seller-card/create
// @desc     Create New Product Card
// @access   Private
const createProductCard = async (req, res) => {
  try {
    const newProductCard = await ProductCardModel.create({
      name: req.query.name,
      price: req.query.price
    });

    return res.status(200).json(newProductCard);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
    console.log({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
  }
};

// @route    GET api/seller-card/me
// @desc     Get current users Seller Card
// @access   Private
const getMySellerCard = async (req, res) => {
  try {
    const sellerCard = await ProductCardModel.findOne({
      user: req.user.id,
      iAmSeller: true
    }).populate("user", ["name", "avatar"]);

    if (!sellerCard) {
      return res
        .status(400)
        .json({ msg: "There is no seller card for this user" });
    }

    res.json(sellerCard);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
    console.log({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
  }
};

// @route    GET api/product-card/my-basket
// @desc     Get My Product Cards (My Basket)
// @access   Private
const getMyProductCards = async (req, res) => {
  try {
    const myBasket = await BasketModel.find({ user: req.user.id }).populate(
      "productCard",
      "name price photo"
    );

    if (!myBasket) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "My Basket Not Found!"
      });
    }

    return res.status(200).json(myBasket);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
    console.log({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
  }
};

// @route    GET api/product-card/add-product-to-basket/:product_card
// @desc     Add product to basket
// @access   Private
const addProductToBasket = async (req, res) => {
  try {
    const productCard = await ProductCardModel.findOne({
      _id: req.params.product_card
    });

    if (!productCard) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "Product Card Not Found!"
      });
    }

    const newBasketProduct = await BasketModel.create({
      productCard: req.params.product_card,
      user: req.user.id
    });

    return res.status(200).json(newBasketProduct);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
    console.log({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
  }
};

// @route    GET api/product-card/add-product-to-favorites/:product_card
// @desc     Add product to favorites
// @access   Private
const addProductToFavorites = async (req, res) => {
  try {
    const productCard = await ProductCardModel.findOne({
      _id: req.params.product_card
    });

    if (!productCard) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "Product Card Not Found!"
      });
    }

    const newFavoritesProduct = await FavoritesModel.create({
      productCard: req.params.product_card,
      user: req.user.id
    });

    return res.status(200).json(newFavoritesProduct);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
    console.log({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
  }
};

// @route    GET api/seller-card/all
// @desc     Get all sellers cards
// @access   Public
const getProductCards = async (req, res) => {
  try {
    const productCards = await ProductCardModel.find({});

    if (!productCards) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found"
      });
    }

    return res.json(productCards);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
    console.log({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
  }
};

// @route    GET api/seller-card/:product_card
// @desc     Get Product Card By ID
// @access   Public
const getProductCard = async (req, res) => {
  try {
    const productCard = await ProductCardModel.findOne({
      _id: req.params.product_card
    });

    if (!productCard) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found"
      });
    }

    return res.json(productCard);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
    console.log({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
  }
};

// @route    GET api/seller-card/user/:user_id
// @desc     Get seller card by user ID
// @access   Public
const getSellerCardByUserId = async (req, res) => {
  try {
    const sellerCard = await ProductCardModel.findOne({
      user: req.params.user_id
    }).populate("carpets", "nameCarpet price seller");

    if (!sellerCard) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found"
      });
    }

    return res.json(sellerCard);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
    console.log({
      statusCode: 500,
      stringStatus: "Error",
      message: `Something went wrong! ${err}`
    });
  }
};

module.exports = {
  createProductCard,
  getMySellerCard,
  getMyProductCards,
  addProductToBasket,
  addProductToFavorites,
  getProductCards,
  getProductCard,
  getSellerCardByUserId
};
