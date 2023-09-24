import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const categoryCourseRelation = sequelize.define(
    'categoryCourseRelation',
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

  categoryCourseRelation.associate = (models) => {
    models.categoryCourseRelation.belongsTo(models.course, {
      as: 'courseId',
      constraints: false,
    });

    models.categoryCourseRelation.belongsTo(models.courseCategory, {
      as: 'category',
      constraints: false,
    });


    
    models.categoryCourseRelation.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.categoryCourseRelation.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.categoryCourseRelation.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return categoryCourseRelation;
}
