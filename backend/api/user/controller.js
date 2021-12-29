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

module.exports.get_user_by_id = async (req, res) => {
  try {
    console.log("iiiiiiiiiiidddddddddd ", req.params.id);
    let user = await User.findOne({
      where: { id: req.params.id },
    });
    console.log("baaaaaaaaaaaaaaaaaaaaaaaaaaaack ", user);
    if (user) res.status(200).send(user);
    else {
      res.status(404);
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e.message });
  }
};

module.exports.permit_user = async (req, res) => {
  try {
    let owner = await User.findOne({where: {id: req.body.user_id}});
    for(let user_id of req.body.user_ids){
      let user = await User.findOne({where: {id: user_id}});
      await user.addOwner(owner);
    }
    res.json({"message": "permessions added"});
  } catch(e) {
    console.log(e);
    res.status(500).json({"error": e.message});
  }
}