const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data.js');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.urlencoded({ extended: true }))

// const accountData = fs.readFileSync(path.join(__dirname, '/json/accounts.json'),
//                                             {encoding:'utf8'});
// const accounts = JSON.parse(accountData);
//
// const userData = fs.readFileSync(path.join(__dirname, '/json/users.json'),
//                                             {encoding:'utf8'});
// const users = JSON.parse(userData);



app.get('/', function(req, res) {
  res.render('index', { title: 'Account Summary', accounts: accounts});
})

app.get('/savings', function(req, res) {
  res.render('account', { account: accounts.savings});
})

app.get('/checking', function(req, res) {
  res.render('account', { account: accounts.checking});
})

app.get('/credit', function(req, res) {
  res.render('account', { account: accounts.credit});
})

app.get('/profile', function(req, res) {
  res.render('profile', { user: users[0]} );
})

app.get('/transfer', function(req, res) {
  res.render('transfer');
})

app.post('/transfer', function(req, res) {
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

app.get('/payment', function(req, res) {
  res.render('payment', { account: accounts.credit } );
})

app.post('/payment', function(req, res) {
  var amt = parseInt(req.body.amount);
  accounts.credit.balance -= amt;
  accounts.credit.available += amt;
  // var accountsJSON = JSON.stringify(accounts);
  // fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON,
  //                             'utf8' );
  writeJSON();

  res.render('payment', { message: 'Payment Successful', account: accounts.credit});
})

app.listen(3000, function() {
  console.log('PS Project Running on port 3000!');
});
