import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const tasks = sequelize.define(
    'tasks',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('dueDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('dueDate'))
                .format('YYYY-MM-DD')
            : null;
        },
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

  tasks.associate = (models) => {
    models.tasks.belongsTo(models.taskList, {
      as: 'taskList',
      constraints: false,
    });


    
    models.tasks.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.tasks.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.tasks.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return tasks;
}
