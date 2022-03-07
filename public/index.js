var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressCount = 0;
var mouseClickCount = 0;

$(document).keypress(function(event) {
  // Only start game when the key pressed for the first time.
  switch (keyPressCount) {
    case 0:
      nextSequence();
      keyPressCount++;
      break;
    default:
      // Do nothing
      break;
  }
});

// Play button press function
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function playFalseSound() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

// Animate clicked button function
function animatePress(clickedButtonObject) {
  clickedButtonObject.addClass("pressed");

  setTimeout(function() {
    clickedButtonObject.removeClass("pressed");
  }, 100);

}

// computer selected button handler function
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  // Button colors is a constant function that has red, blue green and yellow
  // This section constructs the random color array. Everytim the function is called
  // It adds a new variable to the element.
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Show randomly chosen color the the player with animation
  $("." + randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);

  // Change level number based on the total number of items in the gamePattern array
  $("h1").text("Level " + gamePattern.length);
}

// Clicked button handler function
$(".btn").on("click", function(e) {
  // This if ensures that the game only starts when the key is pressed.
  if (keyPressCount !== 0) {

    var userChosenColor = $(e.currentTarget).attr("id");
    animatePress($(e.currentTarget));
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);

    if (gamePattern.length > userClickedPattern.length) {
      if (userClickedPattern[mouseClickCount] === gamePattern[mouseClickCount]) {
        // This section is for true result
        // Do Nothing
      } else {
        // This section is for false result
        // When the player cannot pick
        // the correct button.
        playFalseSound();
        $("h1").text("Press A Key to Start");
        gamePattern = [];
        userClickedPattern = [];
        keyPressCount = 0;
        mouseClickCount = 0;
      }
      mouseClickCount++;
    } else {
      if (userClickedPattern[mouseClickCount] === gamePattern[mouseClickCount]) {
        // This section is for true result
        userClickedPattern = [];
        mouseClickCount = 0;
        nextSequence();
      } else {
        // This section is for false result
        // When the player cannot pick
        // the correct button.
        playFalseSound();
        $("h1").text("Press A Key to Start");
        gamePattern = [];
        userClickedPattern = [];
        keyPressCount = 0;
        mouseClickCount = 0;
      }

    }

  } else {
    // Do nothing
  }
});
