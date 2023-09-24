import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const orderDetail = sequelize.define(
    'orderDetail',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      unitPrice: {
        type: DataTypes.DECIMAL,
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

  orderDetail.associate = (models) => {
    models.orderDetail.belongsTo(models.order, {
      as: 'orderId',
      constraints: false,
    });

    models.orderDetail.belongsTo(models.product, {
      as: 'productId',
      constraints: false,
    });


    
    models.orderDetail.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.orderDetail.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.orderDetail.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return orderDetail;
}
