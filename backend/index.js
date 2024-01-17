import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRoute from "./routes/productRoute.js";
import stripeRoute from "./routes/stripeRoute.js";

const app = express();

// Use necessary middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  console.log(req);
  res.status(200).send("Everything valid");
});

app.use("/proizvodi", productRoute);
app.use("/checkout-stripe", stripeRoute);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("App connected to the database");
    app.listen(process.env.PORT || PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
