import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const artist = sequelize.define(
    'artist',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      bio: {
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

  artist.associate = (models) => {


    models.artist.hasMany(models.file, {
      as: 'photo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.artist.getTableName(),
        belongsToColumn: 'photo',
      },
    });
    
    models.artist.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.artist.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.artist.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return artist;
}
