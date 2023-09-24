import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const courseProgress = sequelize.define(
    'courseProgress',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      progressPercentage: {
        type: DataTypes.DECIMAL,
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

  courseProgress.associate = (models) => {
    models.courseProgress.belongsTo(models.student, {
      as: 'studentId',
      constraints: false,
    });

    models.courseProgress.belongsTo(models.course, {
      as: 'courseId',
      constraints: false,
    });

    models.courseProgress.belongsTo(models.lesson, {
      as: 'currentLesson',
      constraints: false,
    });


    
    models.courseProgress.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.courseProgress.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.courseProgress.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return courseProgress;
}
