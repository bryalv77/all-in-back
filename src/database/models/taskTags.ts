import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const taskTags = sequelize.define(
    'taskTags',
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

  taskTags.associate = (models) => {
    models.taskTags.belongsTo(models.tasks, {
      as: 'taskId',
      constraints: false,
    });

    models.taskTags.belongsTo(models.tags, {
      as: 'tagId',
      constraints: false,
    });


    
    models.taskTags.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.taskTags.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.taskTags.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return taskTags;
}
