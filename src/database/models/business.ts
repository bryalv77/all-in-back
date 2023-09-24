import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const business = sequelize.define(
    'business',
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

  business.associate = (models) => {
    models.business.belongsTo(models.businessCategory, {
      as: 'category',
      constraints: false,
    });

    models.business.belongsTo(models.address, {
      as: 'address',
      constraints: false,
    });

    models.business.belongsToMany(models.user, {
      as: 'owner',
      constraints: false,
      through: 'businessOwnerUser',
    });

    models.business.hasMany(models.file, {
      as: 'logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.business.getTableName(),
        belongsToColumn: 'logo',
      },
    });
    
    models.business.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.business.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.business.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return business;
}
