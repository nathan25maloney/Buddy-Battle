module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define("Challenge", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Challenge.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Challenge.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Challenge;
};
