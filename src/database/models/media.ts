import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const media = sequelize.define(
    'media',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      metadata: {
        type: DataTypes.TEXT,
      },
      show: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

  media.associate = (models) => {
    models.media.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.media.hasMany(models.file, {
      as: 'file',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.media.getTableName(),
        belongsToColumn: 'file',
      },
    });
    
    models.media.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.media.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.media.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return media;
}
