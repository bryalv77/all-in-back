import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const song = sequelize.define(
    'song',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
      },
      duration: {
        type: DataTypes.TEXT,
      },
      genre: {
        type: DataTypes.TEXT,
      },
      externalUrl: {
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

  song.associate = (models) => {
    models.song.belongsTo(models.artist, {
      as: 'artistId',
      constraints: false,
    });

    models.song.belongsTo(models.album, {
      as: 'albumId',
      constraints: false,
    });

    models.song.hasMany(models.file, {
      as: 'media',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.song.getTableName(),
        belongsToColumn: 'media',
      },
    });
    
    models.song.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.song.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.song.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return song;
}
