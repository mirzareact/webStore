import express from "express";
import { Product } from "../models/productModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.sizes) {
      return res.status(400).send({
        message: "Unesi zadata polja: naziv, cijenu i veličine",
      });
    }
    const newProduct = {
      productID: req.body.productID,
      name: req.body.name,
      price: req.body.price,
      images: req.body.images,
      sizes: req.body.sizes,
      description: req.body.description,
    };

    const product = await Product.create(newProduct);

    return res.status(201).send(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });
    return res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.sizes) {
      res.status(400).send("Unesi zadata polja: naslov, datum i tekst");
    }
    const { id } = req.params;

    //dodacvanje novog dijela
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body);

    if (!updatedProduct) {
      res.status(404).send({ message: "Proizvod nije pronaden" });
    }

    res.status(200).send({ message: "Korigovanje proizvoda uspješno" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(`Zahtjev neuspjesan, ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) res.status(404).send({ message: "Proizvod nije pronaden" });

    res.status(200).send({ message: "Uspjesno obrisano" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(`Zahtjev neuspjesan ${err.message}`);
  }
});
export default router;
