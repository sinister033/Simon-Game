var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var begin = false;
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    begin = false;
}
$(document).keydown(function () {
    if (!begin) {
        $("#level-title").text("LEVEL " + level);
        nextSequence();
        begin = true;
    }
});
function check(idx) {
    if (userClickedPattern[idx] === gamePattern[idx]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $("h1").text("GAME OVER, RESTART BY PRESSING ANY KEY");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
$(".btn").click(function () {
    var clickedId = $(this).attr('id');
    var userChosenColor = clickedId;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    check(userClickedPattern.length - 1);
});
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern.length = 0;
    level++;
    if (level > 0) {
        $("h1").text("LEVEL " + level);
    }
    randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(buttonPressed) {
    var toPlay = new Audio('sounds/' + buttonPressed + '.mp3');
    toPlay.play();
}
