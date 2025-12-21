
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const devices = require("./devices.json");

app.get("/devices", (req, res) => res.json(devices));
app.get("/devices/:id", (req, res) => {
  const d = devices.find(x => x.id === req.params.id);
  res.json(d);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
