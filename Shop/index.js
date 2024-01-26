require("dotenv").config();

const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const app = express();
const route = require("./routes");
const http = require('http')
const socket = require('socket.io')

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
  helpers: {
    showRating(tb) {
      let content = "";
      var i = 0;
      for (i = 0; i < tb; i++) {
        content += '<i class="fa fa-star"></i>';
      }
      while (i < 5) {
        content += '<i class="fa fa-star-o"></i>';
        i++;
      }
      return content;
    },
    convertToVND(number) {
      // Using toLocaleString to format the number as currency in VND
      let vndFormatted = number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      return vndFormatted;
    },
  },
});

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/product", express.static(path.join(__dirname, "public")));

// routes
route(app);
const server = http.createServer(app);
const PORT_SERVER = process.env.PORT_SERVER || 3000;

server.listen(PORT_SERVER, () => {
  console.log(`Server is running on port ${PORT_SERVER}`);
});

const io = socket(server);
io.on('connection', async (client) => {
  client.on('channelOrder', async (data) => {
    io.emit('channelOrder', "new order");
  })

  client.on('confirmOrder', async (data) => {
    io.emit('confirmOrder', data);
  })
})
