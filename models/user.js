module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      
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
      foreignKey: "creator_id",
      onDelete: "cascade"
    });

    // Associating User with Score
    // When an User is deleted, also delete any associated Score
    User.hasMany(models.Score, {
      foreignKey: "user_id",
      onDelete: "cascade"
    });

    // Assocating User with Challenge as participant in challenge through UserChallenge
    User.belongsToMany(models.Challenge, { 
      as: "challenge",
      through: models.UserChallenge,
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    });
  };

  return User;
};

