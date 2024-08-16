const { Admin, validateAdmin} = require("../models/adminModel");
const bcrypt = require("bcrypt"); //scripter pwd
const Joi = require("joi"); //schema de pwd

// Création d'un Admin
const adminCread = async (req, res) => {
  try {
    const { error } = validateAdmin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (admin)
      return res
        .status(409)
        .send({ message: "Admin with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(10)); //code en 10
    const hashPassword = await bcrypt.hash(req.body.password, salt); //lire dans la BD

    await new Admin({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Afficher tous les admins
const readAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.send(admins);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Authentification admin
const adminAuth = async (req, res) => {
  try {
    const { error } = validateAuth(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = admin.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Schéma de validation pour l'authentification
const validateAuth = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

// Export
module.exports = {
  adminCread,
  readAllAdmins,
  adminAuth
};
