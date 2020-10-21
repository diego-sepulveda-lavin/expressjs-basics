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

// app listening
app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});
