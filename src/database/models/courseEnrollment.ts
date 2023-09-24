import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const courseEnrollment = sequelize.define(
    'courseEnrollment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      enrollmentDate: {
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

  courseEnrollment.associate = (models) => {
    models.courseEnrollment.belongsTo(models.course, {
      as: 'courseId',
      constraints: false,
    });

    models.courseEnrollment.belongsTo(models.student, {
      as: 'studentId',
      constraints: false,
    });


    
    models.courseEnrollment.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.courseEnrollment.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.courseEnrollment.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return courseEnrollment;
}
