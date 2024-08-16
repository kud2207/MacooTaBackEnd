const mongoose = require("mongoose");
const { Schema } = mongoose;

const produitSchema = new Schema(
  {
    imgLien: { type: String, required: true },
    nameProduit: { type: String, required: true },
    prixProduit: { type: Number, required: true },
    reductionProduit: {
      type: Number,
      required: true,
      max: 99,
    },
  },
  {
    timestamps: true,
  }
);

const Produit = mongoose.model("produit", produitSchema); //def nom table

module.exports = { Produit };
