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
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem})

sequelize
  //.sync({ force: true }) // only use on development, will cause to overwrite the tables
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //console.log(result);
    // app listening
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Diego', email: 'test@test.com' });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    //console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(port, () => {
      console.log(`Server up and running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
