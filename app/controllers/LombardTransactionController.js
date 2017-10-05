var express = require('express'),
  router = express.Router(),
  db = require('../models/index');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/get/payments', function (req, res) {
  var date = req.param('date');
  date = date.replace(/&/g, "")
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/'/g, "`");
  if (new Date(date) == 'Invalid Date')
    return res.status(400).send('Server Error');
  else {
    return db.LombardTransaction.getPayments(date)
      .then(function (data) {
        if (data) {
          return res.status(200).json(data);
        }
      })
      .catch(function (err) {
        console.log(err);
        return res.status(400).send('Server Error');
      });
  }
});

router.post('/confirm/unloading', function (req, res) {
  var confirmArray = req.param('confirmArray');
  for(var index in confirmArray) {
    if (typeof(confirmArray[index]) == "string") {
      confirmArray[index] = confirmArray[index].replace(/&/g, "")
        .replace(/</g, "")
        .replace(/>/g, "")
        .replace(/'/g, "`");
    }
  }

  db.LombardTransaction.confirmUnloading(confirmArray)
    .then(function(data) {
      if(data) {
        return res.status(200).send("Платежі успішно вигружені");
      }
    })
    .catch(function(err) {
      console.log(err);
      return res.status(400).send('Server Error');
    });
});