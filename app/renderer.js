const { ipcRenderer } = require('electron')
const { Howl } = require('howler');
const mm = require('music-metadata');

var track;

const openTrackButton = document.querySelector('#open-track');
const playTrackButton = document.querySelector('#play-track');
const musicArea = document.querySelector('#music-area');

openTrackButton.addEventListener('click', async () => {
  track = await ipcRenderer.invoke('open-track');
})

playTrackButton.addEventListener('click', () => { // Não apertar mais de uma vez
  var player = new Howl({
    src: [track]
  });

  player.play();

  mm.parseFile(track)
    .then( metadata => {
      console.log(metadata);

      
      let trackCover = document.createElement("img");
      let picture = metadata.common.picture[0];
      trackCover.src = `data:${picture.format};base64,${picture.data.toString('base64')}`;
      trackCover.width = "300";
      trackCover.height = "300";
      musicArea.appendChild(trackCover);

      let trackTitle = document.createElement("h1");
      trackTitle.innerHTML = metadata.common.title;
      musicArea.appendChild(trackTitle);

      let albumTitle = document.createElement("h2");
      albumTitle.innerHTML = metadata.common.album;
      musicArea.appendChild(albumTitle);

    })
});