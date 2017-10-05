var Promise = require('bluebird');

module.exports = function (sequelize, DataTypes) {

  var LombardPledgeContract = sequelize.define('LombardPledgeContract',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      enterpriseId: {
        type: DataTypes.INTEGER,
        references: "lombard_enterprise",
        referencesKey: "id"
      },
      seriesOfContract: {
        type: DataTypes.STRING
      },
      numberOfContract: {
        type: DataTypes.STRING
      },
      contractId: {
        type: DataTypes.INTEGER,
        unique: true
      },
      pinCode: {
        type: DataTypes.STRING
      },
      paymentInEndOfTerm: {
        type: DataTypes.INTEGER,
        comment: "флаг оплаты в конце срока (1 - сразу, 0 - конце)"
      },
      fio: {
        type: DataTypes.STRING
      },
      periodName: {
        type: DataTypes.STRING,
        comment: "название периода (день, неделя, месяц, год, произвольный)"
      },
      periodPrice: {
        type: DataTypes.DECIMAL(10, 2),
        comment: "цена одного периода продления (в случае оплаты сразу paymentInEndOfTerm = 0)"
      },
      paymentAmount: {
        type: DataTypes.DECIMAL(10, 2),
        comment: "сумма к оплате (в случае оплаты в конце paymentInEndOfTerm = 1)"
      },
      numberPaymentPeriods: {
        type: DataTypes.INTEGER,
        comment: "кол-во периодов к оплате (в случае оплаты в конце paymentInEndOfTerm = 1)"
      },
      dateTimeDataLoad: {
        type: DataTypes.DATE,
        comment: "дата-время загрузки данных",
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      limitExtension: {
        type: DataTypes.INTEGER,
        comment: "ограничение продления (в периодах)"
      },
      contractAlgorithm: {
        type: DataTypes.STRING,
        comment: "название алгоритма договора"
      },
      contractBeginDate: {
        type: DataTypes.DATEONLY,
        comment: "дата начала договора"
      },
      contractEndDate: {
        type: DataTypes.DATEONLY,
        comment: "дата завершения договора"
      }
  },
    {
      classMethods: {
        associate: function (models) {
          LombardPledgeContract.hasMany(models.LombardTransaction, { foreignKey: 'contractId' , foreignKeyConstraint: true });
        },
        getSeriesOfContract: function() {
          return sequelize.query('SELECT "seriesOfContract" FROM lombard_pledge_contract;');
        }
      },
      tableName: 'lombard_pledge_contract',// Ломбард Договора Залога
      timestamps: false
    }
  );

  LombardPledgeContract.deleteAgreements = function(){
    return new Promise(function(resolve, reject){
      sequelize.query('DELETE FROM lombard_pledge_contract')
        .success(function(data) {
          resolve(true);
        })
        .error(function(err) {
          reject(err);
        });
    });
  };

  LombardPledgeContract.addAgreement = function(contractsArray){
    return new Promise(function(resolve, reject){
      sequelize.query('INSERT INTO lombard_pledge_contract("enterpriseId", "seriesOfContract", \
                                              "numberOfContract", "contractId", \
                                                "pinCode", "paymentInEndOfTerm", \
                                                "fio", "periodName", \
                                                "periodPrice", "paymentAmount", \
                                                "numberPaymentPeriods", "contractBeginDate", "contractEndDate", "contractAlgorithm", "limitExtension") \
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?::DATE, ?::DATE, ?, ?)', null, {raw: true},
        [contractsArray.enterpriseId, contractsArray.seriesOfContract, contractsArray.NumberOfContract, contractsArray.contractId,
          contractsArray.pinCode, contractsArray.paymentInEndOfTerm, contractsArray.fio, contractsArray.periodName,
          contractsArray.periodPrice, contractsArray.paymentAmount, contractsArray.numberPaymentPeriods, contractsArray.contractBeginDate,
          contractsArray.contractEndDate, contractsArray.contractAlgorithm, contractsArray.limitExtension])
        .success(function(data) {
          resolve(true);
        })
        .error(function(err) {
          reject(err);
        });
    });
  };
  return LombardPledgeContract;
};

