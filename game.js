var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = true;
var level = 0;

// HANDLER WHEN A BUTTON IS PRESSED
$(".btn").click(function() {
  var userChosenColour = this.id;
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

// HANDLES WHEN A KEY IS STROKE
$(document).keypress(function(event) {
  if (started) {
    nextSequence();
  }
  started = false;
});

// MOVES TO THE NEXT SEQUENCE
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level  " + level);

}
// START OVERR
function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}

// CHECKING OF ANSWER
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

// WHEN TRIGGERED PLAYS SOUNDS
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ANIMATES PRESS
function animatePress(currentcolor) {
  var activeColor = $("." + currentcolor);
  activeColor.addClass("pressed");
  setTimeout(function() {
    activeColor.removeClass("pressed");
  }, 100);
}
