const { Schema, model } = require("mongoose");

const FavoritesSchema = new Schema(
  {
    productCard: { type: Schema.Types.ObjectId, ref: "ProductCard" },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

module.exports = FavoritesModel = model("Favorites", FavoritesSchema);
