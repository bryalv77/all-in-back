import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const subTasks = sequelize.define(
    'subTasks',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "open",
            "in_progress",
            "stuck",
            "closed"
          ]],
        }
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

  subTasks.associate = (models) => {
    models.subTasks.belongsTo(models.tasks, {
      as: 'taskId',
      constraints: false,
    });


    
    models.subTasks.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.subTasks.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.subTasks.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return subTasks;
}
