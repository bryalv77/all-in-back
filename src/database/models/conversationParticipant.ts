import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const conversationParticipant = sequelize.define(
    'conversationParticipant',
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

  conversationParticipant.associate = (models) => {
    models.conversationParticipant.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.conversationParticipant.belongsTo(models.conversation, {
      as: 'conversationId',
      constraints: false,
    });


    
    models.conversationParticipant.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.conversationParticipant.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.conversationParticipant.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return conversationParticipant;
}
