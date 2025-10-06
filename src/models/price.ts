import mongoose, { Schema, Document } from "mongoose";
import { VariantType } from "./itemConfig";

export interface IPrice extends Document {
  type: VariantType;
  price: number;
}

const PriceSchema: Schema = new Schema({
  type: {
    type: String,
    enum: Object.values(VariantType),
    required: true,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
    get: (v: any) => parseFloat(v.toString()),
  },
});

PriceSchema.set("toJSON", { getters: true, virtuals: false });

export default mongoose.model<IPrice>("Price", PriceSchema);
