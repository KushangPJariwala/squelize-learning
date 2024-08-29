const { where, Op } = require("sequelize");
const db = require("../models");
const sequelize = db.sequelize;
const User = db.user;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ data: users });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const addUser = async (req, res) => {
  const data = req.body;
  try {
    if (data.length > 1) {
      await User.bulkCreate(data);
    } else {
      await User.create(data);
    }
    // await user.save();
    res.status(200).json({ success: "user saved to the database!" });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ success: "user deleted!" });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const updateUser = async (req, res) => {
  const newData = req.body;

  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    await user.update(newData);
    res.status(200).json({ success: "user updated!" });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const query = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "name",
        [sequelize.fn("count", sequelize.col("name")), "total"],
      ],
      // exclude: ["createdAt", "updatedAt"],

      // where: { name: { [Op.like]: "%sh%" } },

      order: [["total", "DESC"]],
      group: "name",
      having: sequelize.literal("COUNT(name) > 1"),
      //   limit: 1,
    });

    res.status(200).json({ data: users });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ err });
  }
};
module.exports = {
  addUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  query,
};
