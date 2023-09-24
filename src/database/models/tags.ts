import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const tags = sequelize.define(
    'tags',
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

  tags.associate = (models) => {
    models.tags.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });


    
    models.tags.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.tags.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.tags.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return tags;
}
