const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const replay = document.querySelector(".replay");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    //sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //Time Display
    const timeDisplay = document.querySelector(".time-display");
    const outlineLength = outline.getTotalLength();

    //Duration
    const timeSelect = document.querySelectorAll(".time-select button");
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
// Select Sound
timeSelect.forEach(Option => {
    Option.addEventListener("click", function() {
        fakeDuration = this.getAttribute('data-time');

        var fakeHours = Math.floor(fakeDuration / 60);
        // alert('fake hours  '+fakeHours);

        var fakeMinutes = Math.floor(fakeDuration % 60);
        timeDisplay.textContent = fakeHours +':'+ fakeMinutes;
        // timeDisplay.textContent = '${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}';
    });
});
 //pick different sound
 sounds.forEach(sound => {
    sound.addEventListener('click', function() {
        song.src = this.getAttribute('data-sound');
        video.src =this.getAttribute('data-video');
        checkPlaying(song);
    });
});

//Play Sound
play.addEventListener("click", () => {
  checkPlaying(song);  
});

    //create a function specific to stop and play the sounds
const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
 }

 //we can animate the circle
 song.ontimeupdate = () => {
     let currentTime = song.currentTime;
     let elapsed = fakeDuration - currentTime;
     let seconds = Math.floor(elapsed % 60);
     let minutes = Math.floor(elapsed / 60);

     //Animate the circle
     let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
     outline.style.strokeDashoffset = progress;
     //Animate the text
     timeDisplay.textContent = minutes +' : '+seconds;

     if (currentTime >= fakeDuration) {
         song.pause();
         song.currentTime = 0;
         play.src = "./svg/play.svg";
         video.pause();
     }
    
}
};

app();