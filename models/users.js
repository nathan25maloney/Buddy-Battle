module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    name: DataTypes.STRING,
    pass: DataTypes.STRING,
    	
    });

  users.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    users.hasMany(models.challenges, {
      onDelete: "cascade"
    });
  };
  return users;
};

