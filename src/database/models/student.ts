import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const student = sequelize.define(
    'student',
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

  student.associate = (models) => {
    models.student.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.student.hasMany(models.file, {
      as: 'photo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.student.getTableName(),
        belongsToColumn: 'photo',
      },
    });
    
    models.student.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.student.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.student.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return student;
}
