const express = require("express");
const app = express();

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Express web server started: on port ${process.env.PORT || 8080}`
  );
  console.log(`Serving content from /${sourceDir}/`);
});
