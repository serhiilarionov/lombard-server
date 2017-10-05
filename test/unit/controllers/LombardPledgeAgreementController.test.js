var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
var request = require('superagent');
var db = require('../../../app/models');

var url = 'http://localhost:3000';
var contractsArray = new Array();
contractsArray[0] = {
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

var wrongContractsArray = {
  enterpriseId: "sdgsd''''",
  seriesOfContract: 'AH',
  NumberOfContract: '12345',
  contractId: Math.floor(Math.random() * 1000),
  pinCode: 1234,
  paymentInEndOfTerm: 0,
  fio: "qwe asd zxc"
};

exports.run = function () {
  describe('LombardPledgeAgreementController', function() {
    describe('Delete agreement', function() {
      it('should delete agreement', function (done) {
        request
          .post(url + '/delete/contracts')
          .end(function(error, res){
            if(error) {
              console.log(error);
            }
            res.status.should.be.equal(200);
            done();
          });
      });
    });

    describe('Add agreement', function() {
      it('should add agreement', function (done) {
        request
          .post(url + '/add/contracts')
          .send({contractsArray:contractsArray})
          .end(function(error, res){
            if(error) {
              console.log(error);
            }
            res.status.should.be.equal(200);
            done();
          });
      });
    });

    describe('Add agreement with wrong data', function() {
      it('should not add agreement', function (done) {
        request
          .post(url + '/add/contracts')
          .send({contractsArray:wrongContractsArray})
          .end(function(error, res){
            if(error) {
              console.log(error);
            }
            res.status.should.be.equal(400);
            done();
          });
      });
    });
  });
};
