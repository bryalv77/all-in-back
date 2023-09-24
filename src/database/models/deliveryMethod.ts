import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const deliveryMethod = sequelize.define(
    'deliveryMethod',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      vehicleInfo: {
        type: DataTypes.TEXT,
      },
      additionalInfo: {
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

  deliveryMethod.associate = (models) => {
    models.deliveryMethod.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });


    
    models.deliveryMethod.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.deliveryMethod.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.deliveryMethod.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return deliveryMethod;
}
