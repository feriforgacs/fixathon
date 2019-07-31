const mongoose = require('mongoose');

require('dotenv').config({
  path: 'variables.env'
});

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error("Can't connect to database :(");
});

require('./models/Item');
require('./models/User');

const app = require('./app');
app.set('port', process.env.PORT || 7778);

const server = app.listen(app.get('port'), () => {
  console.log(`🚀 App running on port ${server.address().port}`);
});