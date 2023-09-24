import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const playlist = sequelize.define(
    'playlist',
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

  playlist.associate = (models) => {
    models.playlist.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });


    
    models.playlist.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.playlist.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.playlist.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return playlist;
}
