import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const userPlaylist = sequelize.define(
    'userPlaylist',
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

  userPlaylist.associate = (models) => {
    models.userPlaylist.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.userPlaylist.belongsTo(models.playlist, {
      as: 'playlistId',
      constraints: false,
    });


    
    models.userPlaylist.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.userPlaylist.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.userPlaylist.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return userPlaylist;
}
