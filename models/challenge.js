module.exports = function(sequelize, DataTypes) {
  var challenges = sequelize.define("challenges", {
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

  challenges.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    challenges.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return challenges;
};
