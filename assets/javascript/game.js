


// Game Object

	var game = {
		guessArray: [],
		guessDisplay: "",
		gameWordsArray: ["dog", "cat"],
	}



// User keystroke is logged and added to an array and then parsed to display without commas

	document.onkeyup = function(e) {
      	game.guessArray.push(e.key);
      	game.guessDisplay = game.guessArray.join(" ");

	// Keystroke guesses are injected back into HTML
	    var htmlGuess = "<p>You chose: " + game.guessDisplay + "</p>";
	    
	    document.querySelector("#letters-guessed").innerHTML = htmlGuess;
}





