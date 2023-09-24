import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const paymentMethods = sequelize.define(
    'paymentMethods',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
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

  paymentMethods.associate = (models) => {



    
    models.paymentMethods.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.paymentMethods.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.paymentMethods.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return paymentMethods;
}
