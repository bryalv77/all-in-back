import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const appointment = sequelize.define(
    'appointment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      appointmentDate: {
        type: DataTypes.DATE,
      },
      appointmentStatus: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "pending",
            "confirmed",
            "canceled",
            "absent"
          ]],
        }
      },
      paymentStatus: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "paid",
            "payment_pending",
            "pay_there"
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

  appointment.associate = (models) => {
    models.appointment.belongsTo(models.customer, {
      as: 'customer',
      constraints: false,
    });

    models.appointment.belongsTo(models.service, {
      as: 'serviceId',
      constraints: false,
    });

    models.appointment.belongsTo(models.availabilityTimeslot, {
      as: 'timeslotId',
      constraints: false,
    });


    
    models.appointment.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.appointment.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.appointment.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return appointment;
}
