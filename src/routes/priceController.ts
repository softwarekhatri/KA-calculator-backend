import { Router } from "express";
import Price from "../models/price";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await Price.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch price data", details: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Price.create(req.body);
    res.status(201).send(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to create price config", details: err });
  }
});

export default router;
