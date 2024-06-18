const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const Production = sequelize.define('Production', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('GETDATE()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('GETDATE()')
    }
  }, {
    sequelize,
    tableName: 'Production',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Production__3213E83F138B7317",
        unique: true,
        fields: ['id']
      }
    ]
  });

  Production.associate = function(models) {
    Production.hasMany(models.QualityControl, { foreignKey: 'productionId' });
  };

  Production.addHook('beforeUpdate', (instance, options) => {
    const changedFields = instance.changed();
    const fieldsToCheck = ['name', 'status'];
    const hasChanges = fieldsToCheck.some(field => changedFields.includes(field));

    if (hasChanges) {
      instance.updatedAt = new Date();
    }
  });

  return Production;
};
