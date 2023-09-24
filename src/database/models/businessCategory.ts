import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const businessCategory = sequelize.define(
    'businessCategory',
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

  businessCategory.associate = (models) => {
    models.businessCategory.belongsTo(models.businessCategory, {
      as: 'parentBusinessType',
      constraints: false,
    });

    models.businessCategory.hasMany(models.file, {
      as: 'logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.businessCategory.getTableName(),
        belongsToColumn: 'logo',
      },
    });
    
    models.businessCategory.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.businessCategory.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.businessCategory.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return businessCategory;
}
