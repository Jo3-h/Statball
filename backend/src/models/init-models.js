var DataTypes = require("sequelize").DataTypes;
var _match_player_stats = require("./match_player_stats");
var _matches = require("./matches");
var _players = require("./players");
var _teams = require("./teams");

function initModels(sequelize) {
  var match_player_stats = _match_player_stats(sequelize, DataTypes);
  var matches = _matches(sequelize, DataTypes);
  var players = _players(sequelize, DataTypes);
  var teams = _teams(sequelize, DataTypes);

  match_player_stats.belongsTo(matches, { as: "match", foreignKey: "match_id"});
  matches.hasMany(match_player_stats, { as: "match_player_stats", foreignKey: "match_id"});
  match_player_stats.belongsTo(players, { as: "player", foreignKey: "player_id"});
  players.hasMany(match_player_stats, { as: "match_player_stats", foreignKey: "player_id"});
  matches.belongsTo(teams, { as: "away_team", foreignKey: "away_team_id"});
  teams.hasMany(matches, { as: "matches", foreignKey: "away_team_id"});
  matches.belongsTo(teams, { as: "home_team", foreignKey: "home_team_id"});
  teams.hasMany(matches, { as: "home_team_matches", foreignKey: "home_team_id"});
  players.belongsTo(teams, { as: "team", foreignKey: "team_id"});
  teams.hasMany(players, { as: "players", foreignKey: "team_id"});

  return {
    match_player_stats,
    matches,
    players,
    teams,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
