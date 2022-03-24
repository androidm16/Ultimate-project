require("dotenv").config();

const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser, getProduct } = require("../middleware/finders");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one user
router.get("/oneuser/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN user with email + password
router.patch("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) res.status(404).json({ message: "Could not find user" });
  if (await bcrypt.compare(password, user.password)) {
    try {
      console.log(process.env.JWT_SECRET_KEY)
      const access_token = jwt.sign(
        JSON.stringify(user), 
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Email and password combination do not match" });
  }
});

// REGISTER a user
router.post("/signup",  async (req, res, next) => {
  console.log("Register route reached");
  const { name, email, password, contact } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    contact,
    password: hashedPassword,
  });

  try {
    console.log("created user: ", user)
    const newUser = await user.save();
    console.log("new user saved: ", newUser)
    try {
      const access_token = jwt.sign(
        JSON.stringify(newUser),
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a user
router.put("/:id", getUser, async (req, res, next) => {
  const { name, contact, password } = req.body;
  if (name) res.user.name = name;
  if (contact) res.user.contact = contact;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    res.user.password = hashedPassword;
  }

  try {
    const updatedUser = await res.user.save();
    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user
router.delete("/:id", getUser, async (req, res, next) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//getting all items in cart
router.get("/:id/cart", auth, async (req, res, next) => {
  try {
    res.json(req.user.cart);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

//Adds a new item to the users cart
router.post("/:id/cart", [auth, getProduct], async (req, res, next) => {
  //  console.log(req.user)

  const user = await User.findById(req.user._id);
  // console.log(user)
  let product_id = res.product._id;
  let title = res.product.title;
  let category = res.product.category;
  let img = res.product.img;
  let price = res.product.price;
  let quantity = req.body;
  let created_by = req.user._id;

  try {
    // console.log(Array.isArray(user.cart))
    // user.cart = []
    user.cart.push({
      product_id,
      title,
      category,
      img,
      price,
      quantity,
      created_by,
    });
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json(console.log(error));
  }
});
//updates the items in the users cart
router.put("/:id/cart", [auth, getProduct], async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const inCart = user.cart.some((prod) => prod._id == req.params.id);
  if (inCart) {
    product.quantity += req.body.quantity;
    const updatedUser = await user.save();
    try {
      res.status(201).json(updatedUser.cart);
    } catch (error) {
      res.status(500).json(console.log(error));
    }
  } else {
    try {
      // console.log(Array.isArray(user.cart))
      // user.cart = []
      let product_id = res.product._id;
      let title = res.product.title;
      let category = res.product.category;
      let img = res.product.img;
      let price = res.product.price;
      let quantity = req.body;
      let created_by = req.user._id;
      user.cart.push({
        product_id,
        title,
        category,
        img,
        price,
        quantity,
        created_by,
      });
      const updatedUser = await user.save();
      res.status(201).json(updatedUser.cart);
    } catch (error) {
      res.status(500).json(console.log(error));
    }
  }
});
//clears the user cart
router.delete("/:id/cart", [auth, getProduct], async (req, res, next) => {});
module.exports = router;