import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const address = sequelize.define(
    'address',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      addressName: {
        type: DataTypes.TEXT,
      },
      firstLine: {
        type: DataTypes.TEXT,
      },
      secondLine: {
        type: DataTypes.TEXT,
      },
      zipCode: {
        type: DataTypes.TEXT,
      },
      phone: {
        type: DataTypes.TEXT,
      },
      coordinates: {
        type: DataTypes.TEXT,
      },
      urlMap: {
        type: DataTypes.TEXT,
      },
      preferred: {
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

  address.associate = (models) => {
    models.address.belongsTo(models.customer, {
      as: 'customer',
      constraints: false,
    });

    models.address.belongsTo(models.city, {
      as: 'city',
      constraints: false,
    });

    models.address.belongsTo(models.business, {
      as: 'business',
      constraints: false,
    });


    
    models.address.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.address.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.address.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return address;
}
