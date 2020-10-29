// import built-in libraries
const path = require('path');

// import installed libraries
const express = require('express');
const bodyParser = require('body-parser');

// import router routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// import controllers
const errorController = require('./controllers/error');

// import database
const sequelize = require('./util/database');

//import models
const Product = require('./models/product');
const User = require('./models/user');

//import other tools
const rootDir = require('./util/path');

// create express app
const app = express();

// engine template configuration
app.set('view engine', 'ejs');
app.set('views', 'views');

// setting port
const port = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  .sync({ force: true }) // only use on development, will cause to overwrite the tables
  .then((result) => {
    //console.log(result);
    // app listening
    app.listen(port, () => {
      console.log(`Server up and running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
