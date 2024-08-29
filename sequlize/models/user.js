module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("name");
          return rawValue
            ? rawValue[0].toUpperCase() + rawValue.slice(1)
            : null;
        },
      },
    },
    {
      // Other model options go here
      tableName: "users",
    }
  );
  return User;
};
