require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const app = express();
const route = require("./routes");

//Use Session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "secret-key-123",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

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
