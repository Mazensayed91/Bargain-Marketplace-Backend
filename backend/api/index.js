// one api router to role them all
module.exports.AuthRouter = require("./Authnticate/routes");
module.exports.ItemsRouter = require("./item/routes");
module.exports.UsersRouter = require("./user/routes");
module.exports.Payment = require("./Payment/routes");
module.exports.Cart = require("./cart/routes");
module.exports.Deposit = require("./deposit/routes");
