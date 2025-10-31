import { Router } from "express";
import ItemConfig from "../models/itemConfig";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await ItemConfig.find();
    return res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to fetch item configs", details: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await ItemConfig.create(req.body);
    return res.status(201).send(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to create item config", details: err });
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const updated = await ItemConfig.findOneAndUpdate(
      { _id },
      { $set: { ...rest } },
      { upsert: false, new: true }
    );
    return res.status(200).send(updated);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to update item config", details: err });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(400)
        .send({ error: "_id is required to delete item config" });
    }
    const deleted = await ItemConfig.findByIdAndDelete(_id);
    if (!deleted) {
      return res.status(404).send({ error: "Item config not found" });
    }
    return res
      .status(200)
      .send({ message: "Item config deleted successfully", deleted });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .send({ error: "Failed to delete item config", details: errorMessage });
  }
});

export default router;
