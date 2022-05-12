const { Schema, model } = require("mongoose");

const BasketSchema = new Schema(
  {
    productCard: { type: Schema.Types.ObjectId, ref: "ProductCard" },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

module.exports = BasketModel = model("Basket", BasketSchema);
