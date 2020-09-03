const { ipcRenderer } = require('electron')
const { Howl } = require('howler');
const mm = require('music-metadata');

var track;

var player;

const coverContainer = document.querySelector('#cover-art');

const trackTitle = document.querySelector('#track-title');
const trackAlbum = document.querySelector('#track-album');

const previousTrackButton = document.querySelector('#previous');
const playTrackButton = document.querySelector('#play');
const nextTrackButton = document.querySelector('#next');

const openTrackButton = document.querySelector('#open-track');


const quitButton = document.querySelector('#quit');

quitButton.addEventListener('click', () => {
  ipcRenderer.sendSync('quit');
})

openTrackButton.addEventListener('click', async () => {
  track = await ipcRenderer.invoke('open-track');
})

playTrackButton.addEventListener('click', () => { // Não apertar mais de uma vez

  if(player) {
    player.stop();
  }

  player = new Howl({
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
      coverContainer.innerHTML = "";
      coverContainer.appendChild(trackCover);

      trackTitle.innerHTML = metadata.common.title;

      trackAlbum.innerHTML = metadata.common.album;

    })
});