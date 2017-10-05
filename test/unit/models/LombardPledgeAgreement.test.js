var chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  ;
var db = require('../../../app/models');

var contractsArray = {
  enterpriseId: 20307730,
  seriesOfContract: 'AH',
  NumberOfContract: '12345',
  contractId: '100',
  pinCode: 1234,
  paymentInEndOfTerm: 0,
  fio: "qwe asd zxc",
  periodName: 'qazwsx',
  periodPrice: 123,
  paymentAmount: 321,
  numberPaymentPeriods: 2,
  contractBeginDate: "2015.02.10",
  contractEndDate: "2015.03.10",
  contractType: "продление",
  limitExtension: 3
};

exports.run = function () {
  describe('LombardPledgeAgreementModel', function() {
    describe('Delete all agreement', function() {
      it('expect to delete all agreement', function (done) {
        db.LombardPledgeContract.deleteAgreements()
          .then(function(data) {
            expect(data).to.be.true;
            done();
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    });

    describe('Add agreement', function() {
      it('expect to add agreement', function (done) {
        db.LombardPledgeContract.addAgreement(contractsArray)
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
