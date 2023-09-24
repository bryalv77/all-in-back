import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const album = sequelize.define(
    'album',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
      },
      year: {
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

  album.associate = (models) => {
    models.album.belongsTo(models.artist, {
      as: 'artistId',
      constraints: false,
    });

    models.album.hasMany(models.file, {
      as: 'cover',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.album.getTableName(),
        belongsToColumn: 'cover',
      },
    });
    
    models.album.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.album.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.album.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return album;
}
