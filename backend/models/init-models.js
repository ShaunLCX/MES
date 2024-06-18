var DataTypes = require("sequelize").DataTypes;
var _Production = require("./Production");
var _QualityControl = require("./QualityControl");

function initModels(sequelize) {
  var Production = _Production(sequelize, DataTypes);
  var QualityControl = _QualityControl(sequelize, DataTypes);

  QualityControl.belongsTo(Production, { as: "production", foreignKey: "productionId"});
  Production.hasMany(QualityControl, { as: "QualityControls", foreignKey: "productionId"});

  return {
    Production,
    QualityControl,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
