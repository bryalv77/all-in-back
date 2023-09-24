import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const conversation = sequelize.define(
    'conversation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "individual",
            "group"
          ]],
        }
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

  conversation.associate = (models) => {


    models.conversation.hasMany(models.file, {
      as: 'avatar',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.conversation.getTableName(),
        belongsToColumn: 'avatar',
      },
    });
    
    models.conversation.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.conversation.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.conversation.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return conversation;
}
