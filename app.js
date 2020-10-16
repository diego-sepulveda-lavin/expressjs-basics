const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});
