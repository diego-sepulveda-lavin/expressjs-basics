const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("This always runs");
  next()
});

app.use("/add-product", (req, res, next) => {
  console.log("In product middleware");
  res.send(
    '<html><link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"> product middleware</html>'
  );
});

app.use("/", (req, res, next) => {
  console.log("In root middleware");
  res.send(
    "<html><link rel='shortcut icon' href='data:image/x-icon;,' type='image/x-icon'>slash middleware</html>"
  );
});

app.listen(3000);
