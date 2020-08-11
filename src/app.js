const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data.js');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

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

app.get('/profile', function(req, res) {
  res.render('profile', { user: users[0]} );
})

app.use('/account', accountRoutes);

app.use('/services', servicesRoutes);

app.listen(3000, function() {
  console.log('PS Project Running on port 3000!');
});
