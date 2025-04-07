const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teams', {
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    games: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    draws: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    loses: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    points_for: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    points_against: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'teams',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "teams_pkey",
        unique: true,
        fields: [
          { name: "team_id" },
        ]
      },
    ]
  });
};
