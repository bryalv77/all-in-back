import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const like = sequelize.define(
    'like',
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

  like.associate = (models) => {
    models.like.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.like.belongsTo(models.posts, {
      as: 'postId',
      constraints: false,
    });


    
    models.like.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.like.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.like.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return like;
}
