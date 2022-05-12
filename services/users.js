// Import Engine
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Import Models
const UserModel = require("../models/User");
const RoleModel = require("../models/Role");

// Import Validate
const { validationResult } = require("express-validator");

// @route    POST api/users
// @desc     Register user
// @access   Public
const registration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { login, fullName, email, phoneNumber, address, password } = req.body;

  try {
    // let user = await User.findOne({ email });
    const userCandidate = await UserModel.findOne({ email: email });

    if (userCandidate) {
      return res.status(400).json({
        statusCode: 400,
        stringStatus: "Error",
        message: "Пользователь с таким email уже существует!"
      });
    }
    // Находим роль "USER", которая явялется базовой для всех пользователей,
    // чтобы присвоить ее нвоому пользователю
    const userRoleCustomerUSER = await RoleModel.findOne({ value: "USER" });

    if (!userRoleCustomerUSER) {
      await RoleModel.create({
        value: "USER"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Создаем нового пользователя, записываем его введеный email в теле запроса,
    // записываем базовую для всех пользователей роль, которую мы нашли в Базе Данных ролей пользователей
    const newUserCustomer = await UserModel.create({
      login: login,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      password: hashPassword,
      roles: [userRoleCustomerUSER.value]
    });

    const payloadCustomer = {
      user: {
        id: newUserCustomer.id
      }
    };

    // Возвращаем успешный статус с ответом от сервера и данными о пользователе
    jwt.sign(
      payloadCustomer,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
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
  registration
};
