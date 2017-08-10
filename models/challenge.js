module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define("Challenge", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    measurement: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gameCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
      unique: true
    }
  });

  Challenge.associate = function(models) {
    // Challenge should belong to only one User
    // A Challenge can't be created without a User due to the foreign key constraint
    Challenge.belongsTo(models.User, {
      foreignKey: {
        as: "creator",
        name: "creator_id",
        allowNull: false
      }
    });

    // Challenge should have multiple Users as participants
    Challenge.belongsToMany(models.User, {
      through: models.Score,
      foreignKey: {
        name: "challenge_id",
        allowNull: false
      }
    });

     // Challenge should have one User as the winner
    Challenge.belongsTo(models.User, {
      foreignKey: {
        as: "winner",
        name: "winner_id",
        allowNull: true
      }
    });
  };

  return Challenge;
};
