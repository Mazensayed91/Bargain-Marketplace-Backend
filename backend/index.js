const {db, app} = require("./app");
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {//----
    app.listen(PORT, () =>  {
        console.log(`Server running at port ${PORT}...`);
    });
}).catch(e => {
    console.log(e);
});//----