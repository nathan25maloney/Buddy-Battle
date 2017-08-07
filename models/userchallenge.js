module.exports = function(sequelize, DataTypes) {
  var UserChallenge = sequelize.define("UserChallenge", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return UserChallenge;
};

