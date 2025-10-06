import { Router } from "express";
import Price from "../models/price";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await Price.find();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch price data", details: err });
  }
});

router.patch("/", async (req, res) => {
  try {
    const { type, price } = req.body;
    const updated = await Price.findOneAndUpdate(
      { type },
      { $set: { price } },
      { upsert: true, new: true }
    );
    return res.status(200).send(updated);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to update price config", details: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Price.create(req.body);
    return res.status(201).send(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to create price config", details: err });
  }
});

export default router;
