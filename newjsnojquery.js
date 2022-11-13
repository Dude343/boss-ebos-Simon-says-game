let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const BUTTONCOLOURS = ["red", "blue", "green", "yellow"];

const handler = (e) => {
        if (started = true) {
        const id = e.target.id;
        e.target.classList.add("pressed");
        setTimeout(() => {
        e.target.classList.remove("pressed");
        }, 100);
        userClickedPattern.push(id);
        console.log(userClickedPattern);
        playSound(id);
        checkAnswer(id.length-1);
        console.log(id.length)
}};

[...document.getElementsByClassName("btn")].forEach(el => {
        el.addEventListener("click", handler)
});

document.addEventListener('keydown', () => {
        if (!started) {
                started = true;
                play();
        }});

function checkAnswer (currentLevel){
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
                if (userClickedPattern.length === gamePattern.length){
                        setTimeout(function () {
                                play();
                        }, 1000);
                }
        } else {
                playSound("wrong");
                document.querySelector("body").classList.add("game-over");
                document.getElementById("level-title").innerHTML ="Game Over, Press Any Key to Restart";
                
                setTimeout(function () {
                document.querySelector("body").classList.remove("game-over");
                }, 200);
                
                startOver();
        }
};



function play(){
        userClickedPattern = [];
        level++;
        document.getElementById("level-title").innerHTML =`${level} level`;
        let randomNumber=Math.floor(Math.random()*4);
        let randomChosenColour = BUTTONCOLOURS[randomNumber];
        let activeButton = document.querySelector("." + randomChosenColour)
        activeButton.classList.add('pressed');
        playSound(randomChosenColour);
        gamePattern.push(randomChosenColour);
        setTimeout(() => {
        activeButton.classList.remove("pressed");
        }, 300);
        console.log(gamePattern)
    };

function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
};

function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
};