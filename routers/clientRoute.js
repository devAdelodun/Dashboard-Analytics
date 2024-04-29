import express from "express";
import { getCustomers, getGeography, getProducts, getTransaction } from "../controllers/clientController.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/products", getProducts);
router.get("/transactions", getTransaction);
router.get("/geography", getGeography);

export default router;
