const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const PORT = 4000;

const FILE = "./stores.json";

// if (!fs.existsSync(FILE)) {
//   fs.writeFileSync(FILE, JSON.stringify([], null, 2));
// }

app.use(cors());

app.use(express.json());

app.get("/stores", (req, res) => {
  const stores = JSON.parse(fs.readFileSync(FILE));
  res.json(stores);
});

app.post("/stores", (req, res) => {
  const stores = JSON.parse(fs.readFileSync(FILE));

  const newStore = {
    id: Date.now(),
    ...req.body,
  };

  stores.push(newStore);
  fs.writeFileSync(FILE, JSON.stringify(stores, null, 2));

  res.json(newStore);
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
