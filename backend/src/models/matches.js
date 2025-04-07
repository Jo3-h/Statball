const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('matches', {
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    home_score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    away_score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    home_score_full: {
      type: DataTypes.STRING,
      allowNull: true
    },
    away_score_full: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    stats_link: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    venue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    home_win: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    home_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'team_id'
      }
    },
    away_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'team_id'
      }
    }
  }, {
    sequelize,
    tableName: 'matches',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "matches_pkey",
        unique: true,
        fields: [
          { name: "match_id" },
        ]
      },
    ]
  });
};
