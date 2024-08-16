require('dotenv').config();
const express = require('express')
const cors = require('cors') //controle les req
const connection = require('./db') //connected bd
const userRoute = require('./routes/userRoute');
const produitRoute = require('./routes/produitRoute');
const routerAdm = require('./routes/adminRoute');

// middlewares
connection ();
const app = express()
app.use(express.json())//lire les fichier json
app.use(cors())

//diffRoutes
app.use('/api/admins', routerAdm)
app.use('/api/users', userRoute)
app.use('/api/produit', produitRoute)

const port = process.env.PORT || 8080
app.listen(port , ()=>console.log(`dB Connected ${port}`))
