const { Produit } = require("../models/produitsModel");

// Créer un nouveau produits
const creadProduit = async (req, res) => {
  const { imgLien, nameProduit, prixProduit, reductionProduit } = req.body;
  try {
    const produit = new Produit({
      imgLien,
      nameProduit,
      prixProduit,
      reductionProduit,
    });
    await produit.save();
    res.send(produit);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//Afficher tout les produit
const readAllProduit = async (req, res) => {
  try {
    const users = await Produit.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//Delete OneProduit
const deleteOneProduit = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Produit.findByIdAndDelete(id) ;
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//export
module.exports = {
  creadProduit,
  readAllProduit,
  deleteOneProduit,
};
