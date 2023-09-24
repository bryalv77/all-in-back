import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const hashtag = sequelize.define(
    'hashtag',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      hashtagText: {
        type: DataTypes.TEXT,
      },
      usageCount: {
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

  hashtag.associate = (models) => {



    
    models.hashtag.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.hashtag.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.hashtag.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return hashtag;
}
