const { creadProduit, readAllProduit, deleteOneProduit } = require("../controllers/produitController");

const produitRoute = require("express").Router();

//route
produitRoute.post("/", creadProduit); //creer produit
produitRoute.get("/", readAllProduit); //read produit
produitRoute.delete("/:id", deleteOneProduit); //delateOne produit


module.exports = produitRoute;