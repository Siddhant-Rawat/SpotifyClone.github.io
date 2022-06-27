//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Dil Cheez Tujhe Dedi", duration:"04:25", filePath:"songs/1.mp3", coverPath:"covers/Dil-Cheez-Tujhe-Dedi.jpg"},
    {songName:"Aaja Soniye", duration:"04:58", filePath:"songs/2.mp3", coverPath:"covers/Mujhse-Shaadi-Karogi.jpg"},
    {songName:"Ding Dong", duration:"06:46", filePath:"songs/3.mp3", coverPath:"covers/Kuch-Toh-Hai.jpg"},
    {songName:"Barso Re", duration:"05:29", filePath:"songs/4.mp3", coverPath:"covers/Guru.jpg"},
    {songName:"Is Kadar Pyar Hai", duration:"05:06", filePath:"songs/5.mp3", coverPath:"covers/Deewana.jpg"},
    {songName:"Sandese Aate Hai Ke Ghar Kab Aaoge", duration:"10:31", filePath:"songs/6.mp3", coverPath:"covers/Sandese_Aate-Hai.jpg"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timeStamp")[0].innerText = songs[i].duration;
});

//Handle Play/Pause Click
masterPlay.addEventListener('click', (e)=>{

    if(audioElement.paused || audioElement.currentTime <= 0) {
        removePlayIcon();
        let songItem = document.getElementById(songIndex);
        songItem.classList.remove('fa-circle-play');
        songItem.classList.add('fa-circle-pause');
    }
    else{
        pauseSong();
        makeAllPlay();
    }

//     makeAllPlay();
//         // songIndex = parseInt(e.target.id);
//         //  console.log(e.id);
//         //  console.log(e.target.id);
//         // console.log(songIndex);
//         //  console.log(e.target);
//          console.log(songIndex);
//         //  let songItem = document.getElementById(songIndex);
//         if(audioElement.paused || audioElement.currentTime <= 0) {
//             e.target.classList.remove('fa-circle-play');
//             e.target.classList.add('fa-circle-pause');
//             //playSong();
//             removePlayIcon();
//         }
//         else{
//             e.target.classList.remove('fa-circle-pause');
//             e.target.classList.add('fa-circle-play');
//             pauseSong();
//         }
 });

function removePlayIcon() {
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.play();
    gif.style.opacity = 1;
}

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update SeekBar
    progress = parseInt((audioElement.currentTime / audioElement.duration)*100);
    myProgressBar.value = progress;
    if(myProgressBar.value == 100) {
        pauseSong();
        checkNextSong();
        myProgressBar.value = 0;
        makeAllPlay();
    }
});

function playSong() {
    audioElement.src = encodeURIComponent("songs/"+(songIndex+1)+".mp3");
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    removePlayIcon();
}

function checkNextSong() {
    if(songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    playSong();
}

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

function pauseSong() {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
}

const makeAllPlay = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click',(e)=>{
        makeAllPlay();
        //songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime <= 0) {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            if(songIndex == parseInt(e.target.id)) {
                removePlayIcon();
            }
            else {
                songIndex = parseInt(e.target.id);
                playSong();
            }
        }
        else{
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            pauseSong();
        }
        
    })
})

document.getElementById('next').addEventListener('click', ()=> {
    checkNextSong();
})

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex <= 0) {
        songIndex = 5;
    }
    else {
        songIndex -= 1;
    }
    playSong();
})