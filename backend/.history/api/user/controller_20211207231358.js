const { User, Item } = require("../../models");


module.exports.get_all_users = async (req, res) => {
    try {
        let users = await User.findAll();

        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.message });
    }
};
