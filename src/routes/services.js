const express = require('express');
const router = express.Router();

const { accounts, users, writeJSON } = require('../data.js');

router.get('/transfer', function(req, res) {
  res.render('transfer');
})

router.post('/transfer', function(req, res) {
  // console.log(req.body);
  var xferAmt = parseInt(req.body.amount);
  var fromAccount = accounts[req.body.from];
  // console.log(fromAccount);
  var oldBalance = fromAccount.balance;
  var newBalance = oldBalance - xferAmt;
  // console.log('new balance From Acct: ' + newBalance);
  fromAccount.balance = newBalance;
  // console.log('new balance in accounts, From account : ' + accounts[req.body.from].balance);

  var toAccount = accounts[req.body.to];
  // console.log('To Account : ' + toAccount);
  var oldToBalance = toAccount.balance;
  var newToBalance = oldToBalance + xferAmt;
  // console.log('new balance To Acct: ' + newToBalance);
  toAccount.balance = newToBalance;
  // console.log('new balance in accounts, To account : ' + accounts[req.body.to].balance);

  // var accountsJSON = JSON.stringify(accounts);
  // fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON,
  //                             'utf8' );
  writeJSON();

  res.render('transfer', { message: 'Transfer Completed'});
})

router.get('/payment', function(req, res) {
  res.render('payment', { account: accounts.credit } );
})

router.post('/payment', function(req, res) {
  var amt = parseInt(req.body.amount);
  accounts.credit.balance -= amt;
  accounts.credit.available += amt;
  // var accountsJSON = JSON.stringify(accounts);
  // fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON,
  //                             'utf8' );
  writeJSON();

  res.render('payment', { message: 'Payment Successful', account: accounts.credit});
})

module.exports = router;
