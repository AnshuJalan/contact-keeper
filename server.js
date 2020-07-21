const express = require('express');

const app = express();

//DEFINE ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log('Server started on Port: ', PORT);
});
