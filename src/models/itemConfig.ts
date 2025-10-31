import mongoose, { Schema, Document } from "mongoose";

export enum VariantType {
  GOLD = "GOLD",
  SILVER = "SILVER",
}

export enum MakingChargeType {
  FIXED = "FIXED",
  PER_GRAM = "PER_GRAM",
  PERCENTAGE = "PERCENTAGE",
}

export interface IItemConfig extends Document {
  name: string;
  purchaseTunch: number;
  saleTunch: number | null;
  addOnPrice?: number | null;
  makingCharge?: number | null;
  makingChargeType?: string | null;
  variant: VariantType;
}

const ItemConfigSchema: Schema = new Schema({
  name: { type: String, required: true },
  purchaseTunch: {
    type: mongoose.Types.Decimal128,
    required: true,
    get: (v: any) => (v == null ? 0 : parseFloat(v.toString())),
  },
  saleTunch: {
    type: mongoose.Types.Decimal128,
    required: false,
    get: (v: any) => (v == null ? 0 : parseFloat(v.toString())),
  },
  addOnPrice: {
    type: mongoose.Types.Decimal128,
    default: null,
    required: false,
    get: (v: any) => (v == null ? 0 : parseFloat(v.toString())),
  },
  makingCharge: {
    type: mongoose.Types.Decimal128,
    default: null,
    required: false,
    get: (v: any) => (v == null ? 0 : parseFloat(v.toString())),
  },
  variant: {
    type: String,
    enum: Object.values(VariantType),
    required: true,
  },
  makingChargeType: {
    type: String,
    enum: Object.values(MakingChargeType),
    required: true,
  },
});

// Separate indexes on name and variant
ItemConfigSchema.index({ name: 1 });
ItemConfigSchema.index({ variant: 1 });

ItemConfigSchema.set("toJSON", {
  getters: true,
  virtuals: false,
});

export default mongoose.model<IItemConfig>("ItemConfig", ItemConfigSchema);
