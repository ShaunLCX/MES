const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const QualityControl = sequelize.define('QualityControl', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    productionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Production',
        key: 'id'
      }
    },
    inspectionDate: {
      type: DataTypes.DATEONLY, 
      allowNull: true
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    defects: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('GETDATE()')
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'QualityControl',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__QualityC__3213E83F3C33CCDC",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  QualityControl.associate = function(models) {
    QualityControl.belongsTo(models.Production, { foreignKey: 'productionId' });
  };

  return QualityControl;
};
