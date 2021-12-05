// Imports
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {loginRouter} from './api/index.js';
// Start up an instance of app
const PORT = process.env.PORT || 5000
const app = express();
const db = require('./models');//------
//const loginRouter = require('./api/index') ///-----


// Cors for cross origin allowance and security
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(express.json());
app.use("/login", loginRouter); //----------





// Routes



app.get("/", (req, res) => {
    res.send("Hello to dist project api")
})

db.sequelize.sync().then(() => {//----
    app.listen(PORT, () =>  {
        console.log("Server running!");
    });
});//----
