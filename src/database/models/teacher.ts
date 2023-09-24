import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const teacher = sequelize.define(
    'teacher',
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

  teacher.associate = (models) => {
    models.teacher.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.teacher.hasMany(models.file, {
      as: 'photo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.teacher.getTableName(),
        belongsToColumn: 'photo',
      },
    });
    
    models.teacher.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.teacher.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.teacher.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return teacher;
}
