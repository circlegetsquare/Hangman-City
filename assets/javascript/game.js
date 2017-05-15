


// Game Object

	var game = {
		guessArray: [],
		guessDisplay: "",
		wordsArray: ["doggie", "cat"],
		gameStatus: false,
		wordToGuess: "",
		wordToGuessArray: [],
		winCount: 0,
		letterCount: 0,
		remainingGuesses: 15,
		htmlGuessDisplay: "",

	}


// Listening to user keystrokes
	document.onkeyup = function(e) {
		var userChoice = e.key;
		console.log(userChoice);

	// Game starts if user hits spacebar
		if (userChoice === "s") {
			game.gameStatus = true;
			console.log(game.gameStatus);
			
		//Change user command message
			var htmlCommand = "<span>Guess a letter to solve the puzzle</span>";
			document.querySelector("#user-command").innerHTML = htmlCommand;

		// Populate remaining guesses area
			var htmlGuessNum = "<p>Remaining guesses: "+ game.remainingGuesses + "</p>";
			document.querySelector("#guesses-remaining").innerHTML = htmlGuessNum;

		// Populate number of wins area		
			var htmlWinNum = "<p>Number of wins: "+ game.winCount + "</p>";
			document.querySelector("#wins").innerHTML = htmlWinNum;

		// Randomly chooses a word from wordsArray
			game.wordToGuess = game.wordsArray[Math.floor(Math.random() * game.wordsArray.length)];
			console.log(game.wordToGuess);

		// Converts chosen word into an array
			game.wordToGuessArray = Array.from(game.wordToGuess);

		// turns array into underscores for display
			for (var i = 0; i < game.wordToGuessArray.length; i++) {
				game.htmlGuessDisplay = game.htmlGuessDisplay + "_ ";
			}
			game.htmlGuessDisplay = "<p>" + game.htmlGuessDisplay + "</p>";
			document.querySelector("#word-to-guess").innerHTML = game.htmlGuessDisplay;


	// Once game starts, listening to user keystroke; checks against existing values in guessArray
		
			document.onkeyup = function(e) {
				var userChoice = e.key;

			// If keystroke is isn't already present in guessArray it is added and then parsed to display without commas
				if (game.guessArray.indexOf(userChoice) === -1) {
				    game.guessArray.push(e.key);
				    game.guessDisplay = game.guessArray.join(" ");

				// Keystroke guesses are injected back into HTML
				    var htmlGuess = "<p>You chose: " + game.guessDisplay + "</p>";
				    document.querySelector("#letters-guessed").innerHTML = htmlGuess;

				// Keystroke is checked against wordToGuessArray, if it does not exist the # Remaining guesses counter moves down
				if (game.wordToGuessArray.indexOf(userChoice) === -1) {
						game.remainingGuesses--;
						var htmlGuessNum = "Remaining guesses: "+ game.remainingGuesses;
						document.querySelector("#guesses-remaining").innerHTML = htmlGuessNum;

				}

				// If the keystroke does exist in wordToGuessArray the underscore in the wordToGuessArray is replaced with the letter
				else {

				}
			}
		}
	}
}




