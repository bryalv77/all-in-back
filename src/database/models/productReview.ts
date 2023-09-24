import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const productReview = sequelize.define(
    'productReview',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      rating: {
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

  productReview.associate = (models) => {
    models.productReview.belongsTo(models.product, {
      as: 'productId',
      constraints: false,
    });

    models.productReview.belongsTo(models.customer, {
      as: 'customerId',
      constraints: false,
    });


    
    models.productReview.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.productReview.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.productReview.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return productReview;
}
