var express = require('express'),
  router = express.Router(),
  db = require('../models/index');
var Promise = require("bluebird");

module.exports = function (app) {
  app.use('/', router);
};

router.post('/delete/contracts', function (req, res) {
  db.LombardPledgeContract.deleteAgreements()
    .then(function (data) {
      if (data) {
        return res.status(200).send('Нарахування успішно видалені.');
      }
    })
    .catch(function (err) {
      console.log(err);
      return res.status(400).send('Server Error');
    });
});

router.post('/add/contracts', function (req, res) {
  var contractsArray = req.param('contractsArray');
  var errors =[];
  for(var index in contractsArray) {
    if (typeof(contractsArray[index]) == "string") {
      contractsArray[index] = contractsArray[index].replace(/&/g, "")
        .replace(/</g, "")
        .replace(/>/g, "")
        .replace(/'/g, "`");
    }
  }

  Promise.each(contractsArray, function (contract) {
    return db.LombardPledgeContract.addAgreement(contract)
      .catch(function (err) {
        console.log(err.errors);
        errors.push("contractId = " + contract.contractId + ": " + err.errors[0].message);
      });
    })
    .then(function () {
      if(errors.length != 0) {
        return res.status(200).send(errors);
      }
      return res.status(200).send('Нарахування успішно занесені в базу.');
    })
    .catch(function (err) {
      console.log(err);
      return res.status(400).send('Server Error');
    });
});