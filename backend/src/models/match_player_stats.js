const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('match_player_stats', {
    stat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'players',
        key: 'player_id'
      }
    },
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'matches',
        key: 'match_id'
      }
    },
    kicks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    handballs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    disposals: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    goals: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    behinds: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hitouts: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tackles: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rebound_50s: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    inside_50s: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clearances: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clangers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    free_kicks_for: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    free_kicks_against: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    brownlow_votes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contested_possessions: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    uncontested_possessions: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contested_marks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    marks_inside_50: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    one_percenters: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bounces: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    goals_against: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    percentage_of_game_played: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'match_player_stats',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "match_player_stats_pkey",
        unique: true,
        fields: [
          { name: "stat_id" },
        ]
      },
    ]
  });
};
