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

export default router;
