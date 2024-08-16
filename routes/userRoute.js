const { userCread, userAuth ,readAllClient} = require("../controllers/userController");
const router = require("express").Router();


//route
router.post("/", userCread ); //cread user
router.post("/login", userAuth ); //login user
router.get("/all", readAllClient ); //login user

module.exports = router;