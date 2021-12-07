const app = require("./app");
const {sequelize1, sequelize2} = require("./models")
const PORT = process.env.PORT || 5000;
Promise.all([sequelize1.sync(), sequelize2.sync()]).then(() => {
    app.listen(PORT, () =>  {
        console.log(`Server running at port ${PORT}...`);
    });
}).catch(e => {
    console.log(e);
});
// sequelize1.sync().then(() => {//----
//     app.listen(PORT, () =>  {
//         console.log(`Server running at port ${PORT}...`);
//     });
// }).catch(e => {
//     console.log(e);
// });//----
