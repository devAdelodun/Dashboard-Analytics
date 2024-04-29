import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
// import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

// DATA IMPORTATION
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/Affiliate.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";
import Transaction from "./models/Transaction.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("common"));
// app.use(cors());

const port = process.env.PORT || 7000;

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Database Connected Successfully");
    /*await Promise.all([
      AffiliateStat.insertMany(dataAffiliateStat)
        .then(() => {
          console.log("AffiliateStat data inserted successfully");
        })
        .catch((error) => {
          if (error.code === 11000) {
            console.error("Duplicate key error in AffiliateStat:", error.message);
          } else {
            console.error("Error inserting AffiliateStat data:", error);
          }
        }),
      OverallStat.insertMany(dataOverallStat)
        .then(() => {
          console.log("OverallStat data inserted successfully");
        })
        .catch((error) => {
          console.error("Error inserting OverallStat data:", error);
        }),
      Product.insertMany(dataProduct)
        .then(() => {
          console.log("Product data inserted successfully");
        })
        .catch((error) => {
          console.error("Error inserting Product data:", error);
        }),
      ProductStat.insertMany(dataProductStat)
        .then(() => {
          console.log("ProductStat data inserted successfully");
        })
        .catch((error) => {
          console.error("Error inserting ProductStat data:", error);
        }),
      Transaction.insertMany(dataTransaction)
        .then(() => {
          console.log("Transaction data inserted successfully");
        })
        .catch((error) => {
          console.error("Error inserting Transaction data:", error);
        }),
      User.insertMany(dataUser)
        .then(() => {
          console.log("User data inserted successfully");
        })
        .catch((error) => {
          console.error("Error inserting User data:", error);
        }),
    ]);*/

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error.message);
    process.exit(1);
  });
