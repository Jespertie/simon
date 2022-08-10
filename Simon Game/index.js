var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Call next colour
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level" + " " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

//--- Check answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    var count = 0;
    for (var i = 0; i < gamePattern.length; i++) {
      if (userClickedPattern[i] === gamePattern[i]) {
        count++;
      }
    } if (count === gamePattern.length) {
      console.log("success");
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//--- Reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//--- Event listeners
$("body").keydown(function() {
  if (!started) {
    $("h1").text("Level " + level);
    setTimeout(nextSequence, 500);
    started = true;
  }
});

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


//--- Sounds & Animations
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed")
  }, 100);
};
