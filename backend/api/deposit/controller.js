const { User } = require("../../models");

module.exports.deposit = async (req, res) => {
  try {
    console.log(req.body);
    let user = await User.findOne({
      where: { id: req.body.id },
    });
    if (!user) {
      res.status(404).json({ message: "user doesn't exist!" });
      return;
    }
    // create a new row object with the updated values you want
    const updatedUser = { balance: req.body.balance };

    // "upsert" that new row
    await user.update(updatedUser).then(() => res.sendStatus(204));
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
