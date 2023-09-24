import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const playlistSong = sequelize.define(
    'playlistSong',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      trackOrder: {
        type: DataTypes.INTEGER,
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

  playlistSong.associate = (models) => {
    models.playlistSong.belongsTo(models.playlist, {
      as: 'playlistId',
      constraints: false,
    });

    models.playlistSong.belongsTo(models.song, {
      as: 'songId',
      constraints: false,
    });


    
    models.playlistSong.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.playlistSong.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.playlistSong.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return playlistSong;
}
