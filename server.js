const express = require('express');
const app = express();
app.use(express.json());
const db = require('./models');

//Routers
const loginRouter = require('./routers/index');
app.use("/login",loginRouter );

db.sequelize.sync().then(() =>{
// listen on port 3000
    app.listen(3000, () => {
    console.log('Express app listening on port 3000');
    });
});