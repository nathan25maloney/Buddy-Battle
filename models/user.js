module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    // Associating User with Challenge they create
    // When an User is deleted, also delete any associated Challenges
    User.hasMany(models.Challenge, {
      as: "creator",
      foreignKey: "creator_id",
      onDelete: "cascade"
    });

    // // Associating User with Score
    // // When an User is deleted, also delete any associated Score
    // User.hasMany(models.Score, {
    //   foreignKey: "user_id",
    //   onDelete: "cascade"
    // });

    // Assocating User with Challenge as participant in challenge through UserChallenge
    User.belongsToMany(models.Challenge, { 
      through: models.Score,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    });
  };

  return User;
};

