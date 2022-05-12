const { Schema, model } = require("mongoose");

const ProductCardSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String }
    // creator: { type: Schema.Types.ObjectId, ref: "User" }

    // iAmSeller: { type: Boolean }, // TODO: sellerStatus
    // companyName: { type: String, required: true },
    // location: { type: String, required: true },
    // phoneNumberOne: { type: String, unique: true, required: true },
    // phoneNumberTwo: { type: String },
    // avatar: { type: Schema.Types.ObjectId, ref: "Avatar" },
    // emailOne: { type: String, required: true, unique: true, sparse: true },
    // emailTwo: { type: String, unique: true, sparse: true },
    // instagram: { type: String },
    // facebook: { type: String },
    // linkedin: { type: String },
    // carpets: [{ type: Schema.Types.ObjectId, ref: "Carpet" }],
    // user: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true
  }
);

module.exports = ProductCardModel = model("ProductCard", ProductCardSchema);
