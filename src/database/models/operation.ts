import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const operation = sequelize.define(
    'operation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fintonicId: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      reference: {
        type: DataTypes.TEXT,
      },
      note: {
        type: DataTypes.TEXT,
      },
      userDescription: {
        type: DataTypes.TEXT,
      },
      quantity: {
        type: DataTypes.DECIMAL,
      },
      valueDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('valueDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('valueDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      operationDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('operationDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('operationDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      cleanNote: {
        type: DataTypes.TEXT,
      },
      cleanUserDescription: {
        type: DataTypes.TEXT,
      },
      primaryDisplay: {
        type: DataTypes.TEXT,
      },
      secondaryDisplay: {
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
        {
          unique: true,
          fields: ['fintonicId', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  operation.associate = (models) => {
    models.operation.belongsTo(models.category, {
      as: 'categoryId',
      constraints: false,
    });

    models.operation.belongsTo(models.bank, {
      as: 'bankId',
      constraints: false,
    });

    models.operation.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    models.operation.hasMany(models.file, {
      as: 'receipt',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.operation.getTableName(),
        belongsToColumn: 'receipt',
      },
    });
    
    models.operation.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.operation.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.operation.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return operation;
}
