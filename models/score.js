module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    score: DataTypes.INTEGER
  });

  // Score.associate = function(models) {
  //   // We're saying that a Score should belong to a User
  //   // A Score can't be created without a User due to the foreign key constraint
  //   Score.belongsTo(models.User, {
  //     foreignKey: {
  //       name: "user_id",
  //       allowNull: false
  //     }
  //   });

  //   // We're saying that a Score should belong to a Challenge
  //   // A Score can't be created without a Challenge due to the foreign key constraint
  //   Score.belongsTo(models.Challenge, {
  //     foreignKey: {
  //       name: "challenge_id",
  //       allowNull: false
  //     }
  //   });
  // };
  
  return Score;
};

