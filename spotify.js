async function getsongs(){
    let a=await fetch("http://127.0.0.1:5500/songs/")
    let response= await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for(let i=0;i<as.length;i++){
        const element=as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }
    return songs;
}

async function main(){
    let songs=await getsongs();
    console.log(songs);
    let songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML=songUL.innerHTML + `<li> ${song.replaceAll("%20"," ")} </li>`;
    }
    var audio=new Audio(songs[0]);
    audio.play();
}

main();