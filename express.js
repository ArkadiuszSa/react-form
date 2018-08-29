const express = require("express");
const app = express();
const path = require("path");

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Express web server started: on port ${process.env.PORT || 8080}`
  );
});
