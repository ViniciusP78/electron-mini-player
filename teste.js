const fs = require('fs')

const readStream = fs.createReadStream('./music.mp3', { highWaterMark: 8 });

readStream.on('data', data => {
  console.log(data.toString())
})