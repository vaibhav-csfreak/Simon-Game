var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;
var c = 0;


//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(event) {
  ////////////////////////////////////////////////////////////
  var idClicked = $(this).attr("id");
  $("#" + idClicked).addClass("pressed");
  ////////////////////////////////////////////////////////////
  setTimeout(function() {
    $("#" + idClicked).removeClass("pressed");
  }, 100);
  ////////////////////////////////////////////////////////////
  function playSound() {
    var audio = new Audio("sounds/" + idClicked + ".mp3");
    audio.play();
  }
  ////////////////////////////////////////////////////////////
  userClickedPattern.push(idClicked);
  console.log(userClickedPattern);
  playSound();
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(level) {

  if (userClickedPattern[level] === gamePattern[level]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("success!!!");
      level++;
      setTimeout(function() {
        nextSequence();
      }, 1000);
      $("h1").html("LEVEL" + level)
    }
  } else {
    console.log("Failure!!!");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    $(document).keydown(function(){
      startOver();
    });

  }
}


function nextSequence() {
    userClickedPattern = [];
  // $("#level-title").text("LEVEL " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}


function startOver() {
  location.reload();
}
