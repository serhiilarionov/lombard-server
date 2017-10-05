

module.exports = function (sequelize, DataTypes) {

  var PaymentSystem = sequelize.define('PaymentSystem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      params: {
        type: DataTypes.JSON
      }
    },
    {
      classMethods: {
        associate: function (models) {
          PaymentSystem.hasMany(models.BillingInformationCompany, { foreignKey: 'paymentSystemId' , foreignKeyConstraint: true });
        }
      },
      tableName: 'payment_system',
      timestamps: false
    }
  );

  return PaymentSystem;
};

