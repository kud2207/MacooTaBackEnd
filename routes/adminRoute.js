const { adminCread, adminAuth, readAllAdmins } = require("../controllers/adminController");
const routerAdm = require("express").Router();

// Routes pour les administrateurs
routerAdm.post("/", adminCread); // Créer un administrateur
routerAdm.post("/login", adminAuth); // Connexion administrateur
routerAdm.get("/all", readAllAdmins); // Lire tous les administrateurs

module.exports = routerAdm;
