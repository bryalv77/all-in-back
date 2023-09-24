import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const courseCategory = sequelize.define(
    'courseCategory',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
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

  courseCategory.associate = (models) => {
    models.courseCategory.belongsTo(models.courseCategory, {
      as: 'parentCategory',
      constraints: false,
    });

    models.courseCategory.hasMany(models.file, {
      as: 'photo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.courseCategory.getTableName(),
        belongsToColumn: 'photo',
      },
    });
    
    models.courseCategory.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.courseCategory.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.courseCategory.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return courseCategory;
}
