const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/download", async (req, res) => {
  const url = req.query.url;
  const format = req.query.format;
  const quality = req.query.quality;

  try {
    const video = ytdl(url, { format, quality }).pipe(res);
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}....`);
});
