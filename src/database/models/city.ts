import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const city = sequelize.define(
    'city',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
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

  city.associate = (models) => {
    models.city.belongsTo(models.country, {
      as: 'country',
      constraints: false,
    });


    
    models.city.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.city.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.city.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return city;
}
