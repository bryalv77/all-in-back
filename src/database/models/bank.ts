import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const bank = sequelize.define(
    'bank',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fintonicId: {
        type: DataTypes.TEXT,
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

  bank.associate = (models) => {


    models.bank.hasMany(models.file, {
      as: 'logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.bank.getTableName(),
        belongsToColumn: 'logo',
      },
    });
    
    models.bank.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.bank.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.bank.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return bank;
}
