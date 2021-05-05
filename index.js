import express from "express";
import mongoose from "mongoose";
import ProductRepository from "./repository/productRepository.js";
let productRepo = new ProductRepository(mongoose);

const app = express();

app.use(express.json());

try {
  const db = await mongoose.connect(
    process.env.MONGO_DB || "mongodb://localhost/e-commerce"
  );
  console.log("Connected to mongodb...");
} catch (error) {
  console.log("Unable to connect to mongodb.", error);
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/products", async (req, res) => {
  let products = {};
  let errors = {};
  try {
    products = await productRepo.getProducts();
  } catch (error) {
    errors = error;
    console.log("Failed to get products", error);
  }
  res.send({ data: products, errors });
});

app.post("/api/products", async (req, res) => {
  let result = {};
  let errors = {};
  try {
    result = await productRepo.save(req.body);
  } catch (error) {
    errors = error;
  }
  res.send({ data: result, errors });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
