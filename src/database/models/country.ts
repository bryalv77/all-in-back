import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const country = sequelize.define(
    'country',
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

  country.associate = (models) => {



    
    models.country.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.country.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.country.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return country;
}
