import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const lesson = sequelize.define(
    'lesson',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      externalUrl: {
        type: DataTypes.TEXT,
      },
      hoursDuration: {
        type: DataTypes.DECIMAL,
      },
      active: {
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

  lesson.associate = (models) => {
    models.lesson.belongsTo(models.course, {
      as: 'courseId',
      constraints: false,
    });

    models.lesson.hasMany(models.file, {
      as: 'media',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.lesson.getTableName(),
        belongsToColumn: 'media',
      },
    });
    
    models.lesson.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.lesson.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.lesson.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return lesson;
}
