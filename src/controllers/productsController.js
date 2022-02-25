const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    // Do the magic
    res.render("products", {
      products,
      toThousand,
    });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    // Do the magic
    const { id } = req.params;
    const product = products.filter((p) => p.id == id);
    res.render("detail", { product });
  },

  // Create - Form to create
  create: (req, res) => {
    // Do the magic
    res.render(path.join(__dirname, "../views/product-create-form"));
  },

  // Create -  Method to store
  store: (req, res) => {
    // Do the magic
    const product = {
      id: products[products.length - 1].id + 1,
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      category: req.body.category,
      description: req.body.description,
      image: "default-image.png",
    };
    products.push(product);
    const productJSON = JSON.stringify(products);
    fs.writeFileSync(productsFilePath, productJSON);
    res.redirect("/product");
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
    const { id } = req.params;
    const product = products.filter((p) => p.id == id);
    res.render(path.join(__dirname, "../views/product-edit-form"), { product });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    const { id } = req.params;
    const product = products.filter((p) => p.id == id);
    res.redirect("/product");
  },

  // // Delete - Delete one product from DB
  // destroy: (req, res) => {
  //   // Do the magic
  // },
};

module.exports = controller;
