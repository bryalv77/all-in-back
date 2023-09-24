import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const taskList = sequelize.define(
    'taskList',
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

  taskList.associate = (models) => {
    models.taskList.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });


    
    models.taskList.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.taskList.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.taskList.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return taskList;
}
