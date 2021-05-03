const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// using an environment with .env for storing creds
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// using a public folder to deliver static assets
app.use(express.static("public"));

// connecting to the db
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

// now code specific to a server

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// this adds an s to the back of "Article" and lowercases all the letters on its own and creates a collection
// named articles if not already made

const Article = mongoose.model("Article", articleSchema);

/**
 * The route targetting all the articles
 *
 */

app
  .route("/articles")
  .get(function (req, res) {
    Article.find(function (err, articles) {
      if (err) {
        console.log(err);
      } else {
        res.send(articles);
      }
    });
  })
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("request successful article saved");
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (err) {
        req.send(err);
      } else {
        res.send("SuccessFully Deleted Everything");
      }
    });
  });

/**
 * The route targetting a specific article.
 *
 */

app.route("/articles/:articleTitle").
get(function (req, res) {
  Article.findOne({ title: req.params.articleTitle }, function (err, article) {
    if (err) {
      res.send(res);
    } else {
      res.send(article);
    }
  });
});

// start listening to the port.
app.listen(process.env.PORT || 3000, function () {
  console.log("The server is listening to port 3000");
});
