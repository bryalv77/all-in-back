import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const followers = sequelize.define(
    'followers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  followers.associate = (models) => {
    models.followers.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.followers.belongsTo(models.user, {
      as: 'followerId',
      constraints: false,
    });


    
    models.followers.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.followers.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.followers.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return followers;
}
