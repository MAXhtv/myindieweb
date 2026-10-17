const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");

const Musica1 = {
  songName: 'Cherry Waves',
  file: 'DeftonesCherryWaves',
  artist: 'Deftones'
};

const Musica2 = {
  songName: 'Drain You',
  file: 'NirvanaDrainYou',
  artist: 'Nirvana'
};

const Musica3 = {
  songName: 'Passenger',
  file: 'DeftonesPassenger',
  artist: 'Deftones'
};

const Musica4 = {
  songName: 'Freakin Out',
  file: 'DAMFreakinOut',
  artist: 'Dexter And The Moonrocks'
};

const Musica5 = {
  songName: 'Dagger',
  file: 'SlowdiveDagger',
  artist: 'Slowdive'
};

const Musica6 = {
  songName: 'When You Sleep',
  file: 'MBVwhenYouSleep',
  artist: 'My Bloody Valentine'
};

const Musica7 = {
  songName: 'Knife Prty',
  file: 'DeftonesKnifePrty',
  artist: 'Deftones'
};

const Musica8 = {
  songName: 'Looking Out For You',
  file:'JoyAgainLookingOutForYou',
  artist: 'Joy Again'
};

const Musica9 = {
  songName: 'FreakingOut The Neighborhood',
  file:'MacDeMarcoFreakingOutTheNeighborhood',
  artist: 'Mac DeMarco'
};



var playlist = [
  Musica1, Musica2, 
  Musica3, Musica4, 
  Musica5, Musica6, 
  Musica7, Musica8, 
  Musica9];
let index = 0;
let isPlaying = false;

function initSong() {
  const currentSong = playlist[index];
  songName.innerText = currentSong.songName;
  bandName.innerText = currentSong.artist;
  song.src = `musicas/${currentSong.file}.mp3`;
}

function playSong() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function previousSong() {
  if (index === 0) {
    index = playlist.length - 1;
  } else {
    index -= 1;
  }
  initSong();
  playSong();
}


function nextSong() {
  if (index === playlist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initSong();
  playSong();
}

// Event Listeners
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('ended', nextSong)

// Initialize
initSong();