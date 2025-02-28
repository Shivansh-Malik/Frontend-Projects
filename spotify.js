async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            let filename = decodeURIComponent(element.href.split("/").pop()); // Extract filename
            songs.push(filename); // Store only the filename, not full URL
        }
    }
    return songs;
}

function formatTime(seconds) {
    seconds = Math.floor(seconds); // Round down to remove decimals
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


let currentAudio = null; // Store the currently playing audio

const playmusic = (track) => {
    if (currentAudio) {
        currentAudio.pause(); // Stop the previous song
        currentAudio.currentTime = 0; // Reset to start
    }

    currentAudio = new Audio("/songs/" + track); // Create new audio
    currentAudio.play();
    play.src="pause.svg";
    document.querySelector(".songinfo").innerHTML = track;  
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    currentAudio.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =`${formatTime(currentAudio.currentTime)} / ${formatTime(currentAudio.duration)}`;
        document.querySelector(".circle").style.left=(currentAudio.currentTime/currentAudio.duration)*100 + "%";
    });
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent + "%";
        currentAudio.currentTime=((currentAudio.duration)*percent)/100;
    })
};

async function main() {
    let songs = await getsongs();
    let songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = ""; // Clear previous list

    for (const song of songs) {
        let songName = song.replace(".mp3", ""); // Remove extension
        let li = document.createElement("li"); 
        li.setAttribute("data-url", song);
        li.innerHTML = `
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${songName}</div>
                <div>Song Artist</div>
            </div>
            <div class="playnow">
                <img class="invert" src="play.svg" alt="">
            </div>
        `;

        li.addEventListener("click", () => {
            let track = li.getAttribute("data-url");
            console.log(`Playing: ${track}`); 
            playmusic(track); // Play song & stop previous one
        });

        songUL.appendChild(li);
    }
    let el1=document.getElementById("play");
    el1.addEventListener("click",()=>{
        if(currentAudio.paused){
            currentAudio.play();
            play.src="pause.svg";
        }
        else{
            currentAudio.pause();
            play.src="play.svg";
        }
    })
    currentAudio.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML=`${formatTime(currentAudio.currentTime)}:${formatTime(currentAudio.duration)}`;
    })
}

main();
