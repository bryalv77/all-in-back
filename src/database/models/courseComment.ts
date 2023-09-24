import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const courseComment = sequelize.define(
    'courseComment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      comment: {
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

  courseComment.associate = (models) => {
    models.courseComment.belongsTo(models.student, {
      as: 'studentId',
      constraints: false,
    });

    models.courseComment.belongsTo(models.course, {
      as: 'courseId',
      constraints: false,
    });

    models.courseComment.belongsTo(models.lesson, {
      as: 'lessonId',
      constraints: false,
    });

    models.courseComment.hasMany(models.file, {
      as: 'media',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.courseComment.getTableName(),
        belongsToColumn: 'media',
      },
    });
    
    models.courseComment.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.courseComment.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.courseComment.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return courseComment;
}
