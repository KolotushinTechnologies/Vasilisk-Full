// Import Models
const ProductCardModel = require("../models/ProductCard");
const BasketModel = require("../models/Basket");
const FavoritesModel = require("../models/Fvaorites");

// @route    POST api/product-card/create
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
    const userProductCard = await BasketModel.findOne({
      productCard: req.params.product_card,
      user: req.user.id
    });

    if (!productCard) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "Product Card Not Found!"
      });
    }

    if (userProductCard) {
      return res.status(400).json({
        statusCode: 400,
        stringStatus: "Bad Request",
        message: "You have already added this item to your cart!"
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

// @route    DELETE api/product-card/delete-product-to-basket/:product_card
// @desc     Remove item from cart
// @access   Private
const deleteMyBasketProductCard = async (req, res) => {
  try {
    const basketProductCard = await BasketModel.findOne({
      productCard: req.params.product_card,
      user: req.user.id
    });

    if (!basketProductCard) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "Basket Product Card Not Found!"
      });
    }

    await BasketModel.deleteOne({
      productCard: req.params.product_card,
      user: req.user.id
    });

    const basketProductCards = await BasketModel.find({ user: req.user.id });

    return res.status(200).json(basketProductCards);
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

// @route    POST api/product-card/add-product-to-favorites/:product_card
// @desc     Add product to favorites
// @access   Private
const addProductToFavorites = async (req, res) => {
  try {
    const productCard = await ProductCardModel.findOne({
      _id: req.params.product_card
    });
    const userProductCard = await FavoritesModel.findOne({
      productCard: req.params.product_card,
      user: req.user.id
    });

    if (!productCard) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "Product Card Not Found!"
      });
    }

    if (userProductCard) {
      return res.status(400).json({
        statusCode: 400,
        stringStatus: "Bad Request",
        message: "You have already added this product to your favorites!"
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

// @route    POST api/product-card/my-favrites
// @desc     Get Favorites Product Cards
// @access   Private
const getMyFavorites = async (req, res) => {
  try {
    const favorites = await FavoritesModel.find({ user: req.user.id }).populate(
      "productCard",
      "name price photo"
    );

    if (!favorites) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "Favorites Not Found!"
      });
    }

    return res.status(200).json(favorites);
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

// @route    DELETE api/product-card/delete-product-to-favorites/:product_card
// @desc     Remove product from favorites
// @access   Private
const deleteMyFavoriteProductCard = async (req, res) => {
  try {
    const favoriteProductCard = await FavoritesModel.findOne({
      productCard: req.params.product_card,
      user: req.user.id
    });

    if (!favoriteProductCard) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "Favorite Product Card Not Found!"
      });
    }

    await FavoritesModel.deleteOne({
      productCard: req.params.product_card,
      user: req.user.id
    });

    const favorites = await FavoritesModel.find({ user: req.user.id });

    return res.status(200).json(favorites);
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

// @route    GET api/product-card/all
// @desc     Get all product cards
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

// @route    GET api/product-card/:product_card
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

module.exports = {
  createProductCard,
  getMyProductCards,
  addProductToBasket,
  deleteMyBasketProductCard,
  addProductToFavorites,
  getMyFavorites,
  deleteMyFavoriteProductCard,
  getProductCards,
  getProductCard
};
