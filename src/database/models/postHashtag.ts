import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const postHashtag = sequelize.define(
    'postHashtag',
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

  postHashtag.associate = (models) => {
    models.postHashtag.belongsTo(models.posts, {
      as: 'postId',
      constraints: false,
    });

    models.postHashtag.belongsTo(models.hashtag, {
      as: 'hashtagId',
      constraints: false,
    });


    
    models.postHashtag.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.postHashtag.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.postHashtag.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return postHashtag;
}
