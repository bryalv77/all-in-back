import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const message = sequelize.define(
    'message',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "sending",
            "sent",
            "seen"
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

  message.associate = (models) => {
    models.message.belongsTo(models.user, {
      as: 'senderId',
      constraints: false,
    });

    models.message.belongsTo(models.user, {
      as: 'recipientId',
      constraints: false,
    });

    models.message.belongsTo(models.conversation, {
      as: 'conversationId',
      constraints: false,
    });

    models.message.hasMany(models.file, {
      as: 'media',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.message.getTableName(),
        belongsToColumn: 'media',
      },
    });
    
    models.message.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.message.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.message.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return message;
}
