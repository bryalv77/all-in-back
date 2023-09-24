import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const promotions = sequelize.define(
    'promotions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.TEXT,
      },
      discount: {
        type: DataTypes.DECIMAL,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('startDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('startDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('endDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('endDate'))
                .format('YYYY-MM-DD')
            : null;
        },
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

  promotions.associate = (models) => {
    models.promotions.belongsTo(models.product, {
      as: 'productId',
      constraints: false,
    });


    
    models.promotions.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.promotions.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.promotions.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return promotions;
}
