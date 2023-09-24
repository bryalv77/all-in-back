import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const course = sequelize.define(
    'course',
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
      price: {
        type: DataTypes.DECIMAL,
      },
      hoursDuration: {
        type: DataTypes.DECIMAL,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('startDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('startDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('endDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('endDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      level: {
        type: DataTypes.TEXT,
      },
      additionalInfo: {
        type: DataTypes.TEXT,
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

  course.associate = (models) => {
    models.course.belongsTo(models.teacher, {
      as: 'teacherId',
      constraints: false,
    });


    
    models.course.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.course.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.course.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return course;
}
