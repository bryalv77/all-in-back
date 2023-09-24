import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const availabilityTimeslot = sequelize.define(
    'availabilityTimeslot',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dayOfTheWeek: {
        type: DataTypes.TEXT,
      },
      startTime: {
        type: DataTypes.DATE,
      },
      endTime: {
        type: DataTypes.DATE,
      },
      capacity: {
        type: DataTypes.INTEGER,
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

  availabilityTimeslot.associate = (models) => {
    models.availabilityTimeslot.belongsTo(models.business, {
      as: 'businessId',
      constraints: false,
    });


    
    models.availabilityTimeslot.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.availabilityTimeslot.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.availabilityTimeslot.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return availabilityTimeslot;
}
