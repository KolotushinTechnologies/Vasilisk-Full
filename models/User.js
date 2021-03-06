const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    login: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    avatar: { type: String },
    roles: [{ type: String, ref: "Role" }]
  },
  {
    timestamps: true
  }
);

module.exports = UserModel = model("User", UserSchema);
