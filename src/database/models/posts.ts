import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const posts = sequelize.define(
    'posts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      postDate: {
        type: DataTypes.DATE,
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

  posts.associate = (models) => {
    models.posts.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.posts.hasMany(models.file, {
      as: 'media',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.posts.getTableName(),
        belongsToColumn: 'media',
      },
    });
    
    models.posts.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.posts.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.posts.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return posts;
}
