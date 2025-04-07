const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('players', {
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'team_id'
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    born: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    debut: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    last: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    debut_age: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    last_age: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'players',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "players_pkey",
        unique: true,
        fields: [
          { name: "player_id" },
        ]
      },
    ]
  });
};
