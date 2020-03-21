const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials/");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jasmine Wambugu"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jasmine Wambugu"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "How can we be of assitance",
    title: "Help",
    name: "Jeremy Wambugu"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({ error: "You must provide a search query" });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jeremy wambugu",
    errorMessage: "Page not found"
  });
});

app.listen(3000, () => {
  console.log(`Server started on port`);
});
