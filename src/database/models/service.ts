import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const service = sequelize.define(
    'service',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      hoursDuration: {
        type: DataTypes.DECIMAL,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  service.associate = (models) => {
    models.service.belongsTo(models.business, {
      as: 'businessId',
      constraints: false,
    });

    models.service.hasMany(models.file, {
      as: 'photo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.service.getTableName(),
        belongsToColumn: 'photo',
      },
    });
    
    models.service.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.service.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.service.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return service;
}
