var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
var request = require('superagent');
var db = require('../../../app/models');

var url = 'http://localhost:3000';
var date="2013.12.25";
var wrongDate="20151225";
var confirmArray = {
  id: 2,
  contractId: 100,
  transactionReference: "qwe"
};

exports.run = function () {
  describe('LombardTransactionController', function() {
    describe('Get payments', function() {
      it('should return payments', function (done) {
        request
          .post(url + '/get/payments')
          .send({date:date})
          .end(function(error, res){
            if(error) {
              console.log(error);
            }
            res.status.should.be.equal(200);
            expect(res.body[0]).to.contain.keys("contractId", "id", "transactionReference", "paymentSystemType", "paymentAccount", "timeOfPayment", "amountOfExtension", "numberPeriodsOfExtension", "dateOfDischarge");
            done();
          });
      });
    });

    describe('Get payments for the wrong date', function() {
      it('should return an empty array', function (done) {
        request
          .post(url + '/get/payments')
          .send({date:wrongDate})
          .end(function(error, res){
            if(error) {
              console.log(error);
            }
            res.status.should.be.equal(400);
            expect(res.body[0]).to.be.empty;
            done();
          });
      });
    });

    describe('Confirm unloading', function() {
      it('should confirm the unloading', function (done) {
        request
          .post(url + '/confirm/unloading')
          .send({confirmArray:confirmArray})
          .end(function(error, res){
            if(error) {
              console.log(error);
            }
            res.status.should.be.equal(200);
            done();
          });
      });
    });
  });
};
