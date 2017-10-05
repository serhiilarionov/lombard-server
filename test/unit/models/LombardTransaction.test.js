var chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  ;

var db = require('../../../app/models');
var date="2013.12.25";
var confirmArray = {
  id: 2,
  contractId: 100,
  transactionReference: "qwe"
};

exports.run = function () {
  describe('LombardTransactionModel', function() {
    describe('Get payments', function() {
      it('expect to get payments', function (done) {
        db.LombardTransaction.getPayments(date)
          .then(function(data) {
            expect(data[0]).to.contain.keys("contractId", "id", "transactionReference", "paymentSystemType", "paymentAccount", "timeOfPayment", "amountOfExtension", "numberPeriodsOfExtension", "dateOfDischarge");
            done();
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    });

    describe('Сonfirm the unloading', function() {
      it('expect to get сonfirm', function (done) {
        db.LombardTransaction.confirmUnloading(confirmArray)
          .then(function(data) {
            expect(data).to.be.true;
            done();
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    });
  });
};
