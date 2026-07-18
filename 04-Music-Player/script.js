const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "songs/song1.mp3",
        cover: "images/song1.jpeg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "songs/song2.mp3",
        cover: "images/song2.jpeg"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        src: "songs/song3.mp3",
        cover: "images/song3.jpeg"
    }
];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlist = document.querySelectorAll(".playlist li");

const themeBtn = document.getElementById("themeBtn");

let currentSong = 0;

function loadSong(index) {
    audio.src = songs[index].src;
    cover.src = songs[index].cover;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

loadSong(currentSong);

playBtn.addEventListener("click", () => {

    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
        cover.classList.add("playing");
    } else {
        audio.pause();
        playBtn.textContent = "▶";
        cover.classList.remove("playing");
    }

});

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
    cover.classList.add("playing");

});

prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
    cover.classList.add("playing");

});

audio.addEventListener("loadedmetadata", () => {

    progress.max = Math.floor(audio.duration);
    duration.textContent = formatTime(audio.duration);

});

audio.addEventListener("timeupdate", () => {

    progress.value = Math.floor(audio.currentTime);
    currentTime.textContent = formatTime(audio.currentTime);

});

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

function formatTime(time) {

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;

}

playlist.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentSong = index;

        loadSong(currentSong);
        audio.play();
        playBtn.textContent = "⏸";
        cover.classList.add("playing");

    });

});

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
    cover.classList.add("playing");

});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀ Light Mode";
    } else {
        themeBtn.innerHTML = "🌙 Dark Mode";
    }

});