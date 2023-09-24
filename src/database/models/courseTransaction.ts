import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const courseTransaction = sequelize.define(
    'courseTransaction',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL,
      },
      transactionDate: {
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

  courseTransaction.associate = (models) => {
    models.courseTransaction.belongsTo(models.course, {
      as: 'courseId',
      constraints: false,
    });

    models.courseTransaction.belongsTo(models.student, {
      as: 'studentId',
      constraints: false,
    });


    
    models.courseTransaction.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.courseTransaction.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.courseTransaction.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return courseTransaction;
}
