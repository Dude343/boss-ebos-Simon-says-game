// MAIN    MAIN    MAIN    MAIN    MAIN    MAIN    MAIN    MAIN    MAIN    MAIN
let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];

let started = false;

let level = 0;

let randomChosenColour = buttonColours[Math.floor(Math.random()*buttonColours.length)];
gamePattern.push(randomChosenColour);

$(".btn").click(function(){                               // why exactly .btn and not #btn????
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);   // Because for example length = 4 then 4 - 1 = 3 is the last unit of array 
});

function checkAnswer (currentLevel){
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
                if (userClickedPattern.length === gamePattern.length){
                        setTimeout(function () {
                                nextSequence();
                        }, 1000);
                }
        } else {
                playSound("wrong");
                $("body").addClass("game-over");
                $("#level-title").text("Game Over, Press Any Key to Restart");
                
                setTimeout(function () {
                        $("body").removeClass("game-over");
                }, 200);
                
                startOver();
        }
};

function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
};

$(document).keypress(function() {
        if (!started) {
                $("#level-title").text("Level " + level);
                nextSequence();
                started = true;
        }
});

function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
};

function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
                $("#" + currentColor).removeClass("pressed");
        }, 100);
};

function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
};