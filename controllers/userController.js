const { User, validate } = require("../models/userModel");
const bcrypt = require("bcrypt"); //scripter pwd
const Joi = require("joi"); //schema de pwd

//Cread User..
const userCread = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
 
    const salt = await bcrypt.genSalt(Number(10)); //code en 10
    const hashPassword = await bcrypt.hash(req.body.password, salt); //lire dan sla Bd

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};


//Afficher tout les users
const readAllClient = async (req, res) => {
	try {
	  const users = await User.find({});
	  res.send(users);
	} catch (error) {
	  console.error(error); 
	  res.status(500).send(error);
	}
  };
  

//auth user
const userAuth = async (req, res) => {
	try {
		const { error } = validateAuth(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

//schema de validation
const validateAuth = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};



//export
module.exports = {
    userCread,
	readAllClient,
    userAuth
}