// Imports
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Start up an instance of app
const PORT = process.env.PORT || 5000
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(bodyParser.json({limit: "30mb", extended: true}));

// Cors for cross origin allowance and security
app.use(cors());


// Routes

app.get("/", (req, res) => {
    res.send("Hello to dist project api")
})

app.listen(PORT, () =>  {
    console.log("Server running!");
})