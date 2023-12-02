require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const route = require("./routes");

const handlebars = exphbs.create({
  // tạo handlebars với những config
  extname: ".hbs",
  defaultLayout: "main",
  helpers: require("./utils/customHelper.u"),
});

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// routes
route(app);

const PORT_SERVER = process.env.PORT_SERVER || 3000;
app.listen(PORT_SERVER, () => {
  console.log(`Server is running on port ${PORT_SERVER}`);
});
