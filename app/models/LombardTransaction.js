var Promise = require('bluebird');

module.exports = function (sequelize, DataTypes) {

  var LombardTransaction = sequelize.define('LombardTransaction',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      contractId: {
        type: DataTypes.INTEGER,
        references: "lombard_pledge_contract",
        referencesKey: "contractId"
      },
      transactionCreatedAt: {
        type: DataTypes.DATE,
        comment: "дата-время создания транзакции",
        defaultValue: sequelize.fn('NOW')
      },
      paymentAmount: {
        type: DataTypes.DECIMAL(10, 2),
        comment: "сума платежа"
      },
      numberPeriodsOfExtension: {
        type: DataTypes.INTEGER,
        comment: "кол периодов продления"
      },
      amountOfExtension: {
        type: DataTypes.DECIMAL(10, 2),
        comment: "сума продления"
      },
      operationType: {
        type: DataTypes.INTEGER,
        comment: "тип операции (продление - 0)"
      },
      transactionReference: {
        type: DataTypes.STRING
      },
      timeOfPayment: {
        type: DataTypes.DATE,
        comment: "дата-время проведения платежа"
      },
      paymentSystemType: {
        type: DataTypes.STRING,
        comment: "тип платежной системы (из справочника)"
      },
      dateOfDischarge: {
        type: DataTypes.DATE,
        comment: "дата выргузки в исходную систему (ломбард)"
      },
      paymentAccount: {
        type: DataTypes.STRING,
        comment: "расчетный счет"
      },
      payerPhone: {
        type: DataTypes.STRING
      },
      payerEmail: {
        type: DataTypes.STRING
      },
      paymentReceived: {
        type: DataTypes.INTEGER,
        comment: "флаг принятия платежа"
      },
      isReceivedPaymentSend: {
        type: DataTypes.INTEGER,
        comment: "флаг отправленной квитанции о принятии платежа"
      },
      paymentComplete: {
        type: DataTypes.INTEGER,
        comment: "флаг проведения платежа"
      },
      isCompletePaymentSend: {
        type: DataTypes.INTEGER,
        comment: "флаг отправленной квитанции о проведении платежа"
      },
      extensionCode: {
        type: DataTypes.STRING,
        comment: "код продления (подтверждающий подлинность квитанции - геренируется в отделении)"
      },
      receipt: {
        type: DataTypes.BLOB
      }
      //receiptNumber: {
      //  type: DataTypes.STRING,
      //  comment: "номер квитанции"
      //},
      //city: {
      //  type: DataTypes.STRING
      //},
      //branchNumber: {
      //  type: DataTypes.STRING
      //},
      //receiptDate: {
      //  type: DataTypes.DATE,
      //  comment: "дата выписки квитанции"
      //}
    },
    {
      tableName: 'lombard_transaction',
      timestamps: false
    }
  );
  LombardTransaction.getPayments = function(date) {
    return new Promise(function(resolve, reject) {
      sequelize.query('SELECT "contractId", "id", "transactionReference", "paymentSystemType", "paymentAccount", "timeOfPayment", "amountOfExtension", "numberPeriodsOfExtension", "dateOfDischarge" \
                FROM lombard_transaction \
                WHERE "timeOfPayment" > ?', null, {raw: true},
        [date])
        .success(function(data) {
          resolve(data[0]);
        })
        .error(function(err) {
          reject(err);
        });
    });
  };

  LombardTransaction.confirmUnloading = function(confirmArray) {
    return new Promise(function(resolve, reject) {
      sequelize.query('UPDATE lombard_transaction SET "paymentReceived" = 1 WHERE id = ? AND "contractId" = ? AND "transactionReference" = ?',
        null, {raw: true},
        [confirmArray.id, confirmArray.contractId, confirmArray.transactionReference])
        .success(function(data) {
          resolve(true);
        })
        .error(function(err) {
          reject(err);
        });
    });
  };

  return LombardTransaction;
};

