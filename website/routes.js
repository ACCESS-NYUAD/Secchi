const express = require("express");
const router = express.Router();

const feedbackDB = require("./models/feedback");
const dataDB = require("./models/data");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/monitoring", (req, res, next) => {
  res.render("monitoring");
});

router.get("/contact", (req, res, next) => {
  res.render("contact");
});

router.get("/policy", (req, res, next) => {
  res.render("privacy-policy");
});

router.get("/policy-ar", (req, res, next) => {
  res.render("policy-ar");
});

router.post("/feedback", async (req, res) => {
  if (req.body != null) {
    const { email, feedback } = req.body;
    const newFeedback = new feedbackDB({ email, feedback });

    newFeedback
      .save()
      .then((err) => {
        res.status(200).json({ success: true, message: "Message received" });
      })
      .catch((err) => {
        res.status(500).json({ success: false, message: "Error" });
      });
  } else {
    res.status(500).json({ success: false, message: "No payload sent" });
  }
});

router.get("/coordinates", async (req, res) => {
  const foundData = await dataDB.find();
  res.status(200).json({ success: true, data: foundData });
});

module.exports = router;
