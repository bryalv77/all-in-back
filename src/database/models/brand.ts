import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const brand = sequelize.define(
    'brand',
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

  brand.associate = (models) => {
    models.brand.belongsTo(models.address, {
      as: 'address',
      constraints: false,
    });

    models.brand.hasMany(models.file, {
      as: 'photo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.brand.getTableName(),
        belongsToColumn: 'photo',
      },
    });
    
    models.brand.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.brand.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.brand.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return brand;
}
