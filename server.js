const express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/download', (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  ytdl.getInfo(url)
    .then(info => {
      const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
      const stream = ytdl(url, { filter: 'audioonly' });

      res.setHeader('Content-Type', format.mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${info.title}.mp3"`);

      stream.pipe(res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error downloading video');
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
