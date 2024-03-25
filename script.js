const songName = document.getElementById("music-name");
const singername = document.getElementById("song-name")
const song = document.getElementById("audio");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress")
const progressContainer = document.getElementById("progress-container")
const shuffleButton = document.getElementById("shuffle")

const zumzumzum = {
    songName : "zumzumzum",
    singername : "Teto",
    file_music: "teto_zumzumzum",
    file_cover: "teto",
};

const AnosLuz = {
    songName : "Anos Luz",
    singername : "Matue",
    file_music: "matue_anos_luz",
    file_cover: "matue",
};

let isPlaying = false;
let isShuffled = false
const originalPlaylist = [zumzumzum, AnosLuz];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function initializeSong(){
    cover.src = `capas/${sortedPlaylist[index].file_cover}.jpg`;
    song.src = `musicas/${sortedPlaylist[index].file_music}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    singername.innerText = sortedPlaylist[index].singername;
}

function previousSong(){
    if(index === 0 ){
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }
    else {
        index +=  1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

function shuffleButtonClick(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray();
    }

}

initializeSong();

play.addEventListener("click" , playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBar)
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClick);