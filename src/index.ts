import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import ItemConfigRoute from "./routes/ItemConfigController";
import PriceRoute from "./routes/priceController";

const app = express();
const PORT = 3001;

env.config();
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Hello from Khatri Alankar Calculator Backend!");
});

app.use("/item-configs", ItemConfigRoute);
app.use("/price", PriceRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: any) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
