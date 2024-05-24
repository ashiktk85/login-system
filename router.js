var express = require("express");
var router = express.Router();



router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("home");
  } else {
    res.render("base", { title: "Express" });
  }
});



router.post("/login", (req, res) => {
  const credential = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  if (req.body.email === credential.email && req.body.password === credential.password) {
    req.session.user = req.body.email;
    res.json({ status: true, message: "Login successful" });
  } else if (req.body.email !== credential.email && req.body.password !== credential.password) {
    res.json({ status: false, message: "Invalid email and password" });
  } else if (req.body.email !== credential.email) {
    res.json({ status: false, message: "Invalid email" });
  } else if (req.body.password !== credential.password) {
    res.json({ status: false, message: "Invalid password" });
  } else {
    res.json({ status: false, message: "Login failed" });
  }
});


router.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user });
  } else {
    res.send("Unauthorize User");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.json({status : true})
    }
  });
});

module.exports = router;
