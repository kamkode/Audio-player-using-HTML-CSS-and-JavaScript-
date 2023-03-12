const musicList = document.getElementById('music-list');
const fileUpload = document.getElementById('file-upload');
const songTitle = document.getElementById('song-title');new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Kill This Love 💔",
          artist: "BlackPink",
          cover: "https://iili.io/H1hGdV2.jpg",
          source: "https://audio.jukehost.co.uk/XMq8hSwgPKbHkY4srMhPWEFqHSigxcNQ",
          url: "https://www.youtube.com/watch?v=2S24-y0Ij3Y&ab_channel=BLACKPINK",
          favorited: false
        },
        {
          name: "DDU DU DDU DU 🔫 ",
          artist: "BlackPink",
          cover: "https://iili.io/H1hGJol.jpg",
          source: "https://audio.jukehost.co.uk/FamrE48qfWUNWmskzgBfiFW5mbaSUCG7",
          url: "https://www.youtube.com/watch?v=IHNzOHi8sJs&ab_channel=BLACKPINK",
          favorited: true
        },

        {
          name: "Lovesick Girls",
          artist: "BlackPink",
          cover: "https://iili.io/H1hEyNf.jpg",
          source: "https://audio.jukehost.co.uk/kmMdEcT0mVFDBlkcf1ZoydqaM19deMJ1",
          url: "https://www.youtube.com/watch?v=dyRsYk0LyA8&ab_channel=BLACKPINK",
          favorited: false
        },

        {
          name: "Playing With Fire 🔥",
          artist: "BlackPink",
          cover: "https://iili.io/H1hGFK7.jpg",
          source: "https://audio.jukehost.co.uk/9t8OuMg1bqsR0JtyADcqKaXbTaLvGOkl",
          url: "https://www.youtube.com/watch?v=9pdj4iJD08s&ab_channel=BLACKPINK",
          favorited: false
        },
        {
          name: "As If It's Your Last",
          artist: "BlackPink",
          cover: "https://iili.io/H1hGKl9.jpg",
          source: "https://audio.jukehost.co.uk/cXSnf1QxAl4N7keT52hTID5wZC8Nmfu1",
          url: "https://www.youtube.com/watch?v=Amq-qlqbjYA&ab_channel=BLACKPINK",
          favorited: true
        },
        {
          name: "Boy with Love",
          artist: "BTS",
          cover: "https://iili.io/H1hG2PS.jpg",
          source: "https://audio.jukehost.co.uk/k1H7J0lBSzjvK8pGe5pb3lPJeBCfcJUz",
          url: "https://www.youtube.com/watch?v=XsX3ATc3FbA&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Dynamite",
          artist: "BTS",
          cover: "https://iili.io/H1hGfSe.jpg",
          source: "https://audio.jukehost.co.uk/w5el9uHEuw5yFJ1dPjeP5lMO78BbtRdr",
          url: "https://www.youtube.com/watch?v=gdZLi9oWNZg&ab_channel=HYBELABELS",
          favorited: true
        },
        {
          name: "DNA",
          artist: "BTS",
          cover: "https://iili.io/H1hGCAb.jpg",
          source: "https://audio.jukehost.co.uk/hhWaUJpcCrCCPi1S2wWup9uL1uVNjvOb",
          url: "https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Butter",
          artist: "BTS",
          cover: "https://iili.io/H1hGBHu.jpg",
          source: "https://audio.jukehost.co.uk/X2kcaQZROQIikDD5P65ZetiaqdrZNX77",
          url: "https://www.youtube.com/watch?v=WMweEpGlu_U&ab_channel=HYBELABELS",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});

const songArtist = document.getElementById('song-artist');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const volumeSlider = document.getElementById('volume-slider');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');

const songDuration = document.getElementById('song-duration');

let musicIndex = 0;
let musicListArray = [];

// Function to add new music to the list
function addMusicToList(file) {
    let musicItem = document.createElement('li');
    musicItem.innerText = file.name;
    musicList.appendChild(musicItem);
    musicListArray.push(file);
}

// Event listener for file upload
fileUpload.addEventListener('change', function() {
    const files = this.files;
    for (let i = 0; i < files.length; i++) {
        addMusicToList(files[i]);
    }
});

// Function to update the currently playing music
function updateMusicDetails() {
    const music = musicListArray[musicIndex];
    songTitle.innerText = music.name;
    songArtist.innerText = 'Unknown Artist';
    songDuration.innerText = music.duration;
}

// Function to play the current music
function playMusic() {
    const music = musicListArray[musicIndex];
    const musicUrl = URL.createObjectURL(music);
    const audio = new Audio(musicUrl);
    audio.volume = volumeSlider.value / 100;
    audio.play();
    updateMusicDetails();
}

// Function to pause the current music
function pauseMusic() {
    const audio = document.getElementsByTagName('audio')[0];
    audio.pause();
}

// Function to stop the current music
function stopMusic() {
    const audio = document.getElementsByTagName('audio')[0];
    audio.pause();
    audio.currentTime = 0;
}

// Function to play the previous music
function prevMusic() {
    if (musicIndex === 0) {
        musicIndex = musicListArray.length - 1;
    } else {
        musicIndex--;
    }
    stopMusic();
    playMusic();
}

// Function to play the next music
function nextMusic() {
    if (musicIndex === musicListArray.length - 1) {
        musicIndex = 0;
    } else {
        musicIndex++;
    }
    stopMusic();
    playMusic();
}

// Event listener for play button
playBtn.addEventListener('click', function() {
    playMusic();
});

// Event listener for pause button
pauseBtn.addEventListener('click', function() {
    pauseMusic();
});

// Event listener for stop button
stopBtn.addEventListener('click', function() {
    stopMusic();
});

// Event listener for previous button
prevBtn.addEventListener('click', function() {
    prevMusic();
});

// Event listener for next button
nextBtn.addEventListener('click', function() {
    nextMusic();
});

// Event listener for shuffle button
shuffleBtn.addEventListener('click', function() {
    musicIndex = Math.floor(Math.random() * musicListArray.length);
    stopMusic();
    playMusic();
});

// Event listener for repeat button
repeatBtn.addEventListener('click', function() {
    stopMusic();
    playMusic();
});

// Event listener for volume slider
volumeSlider.addEventListener
// Event listener for volume slider
volumeSlider.addEventListener('input', function() {
const audio = document.getElementsByTagName('audio')[0];
audio.volume = this.value / 100;
});

// Function to log in
function login() {
const username = usernameInput.value;
const password = passwordInput.value;
if (username === 'admin' && password === 'password') {
loginForm.style.display = 'none';
} else {
alert('Incorrect username or password');
}
}

// Event listener for login form submit
loginForm.addEventListener('submit', function(event) {
event.preventDefault();
login();
});

// Event listener for music list item click
musicList.addEventListener('click', function(event) {
if (event.target.nodeName === 'LI') {
musicIndex = Array.from(musicList.children).indexOf(event.target);
stopMusic();
playMusic();
}
});


