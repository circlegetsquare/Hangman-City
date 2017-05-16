


// Game Object

	var game = {
		letterGuessArray: [],
		letterGuessDisplay: "",
		wordsArray: ["doggie", "cat"],
		gameStatus: false,
		wordToGuess: "",
		wordToGuessArray: [],
		winCount: 0,
		letterCount: 0,
		remainingGuesses: 15,
		htmlGuessDisplay: "",
		userChoice: "",
		underscoreGuessArray: [],

	}


// Listening to user keystrokes
	document.onkeyup = function(e) {
		game.userChoice = e.key;
		console.log(game.userChoice);

	// Game starts if user hits spacebar
		if (game.userChoice === "s") {
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

		// turns wordToGuess array into new array of same length populated with underscores
			for (var i = 0; i < game.wordToGuessArray.length; i++) {
				game.underscoreGuessArray[i] = "_";
			}

		// Turns underscoreGuessArray into a single variable with spaces between each underscore for HTML display, then adds HTML and injects
			game.htmlGuessDisplay = game.underscoreGuessArray.join(" ");
			game.htmlGuessDisplay = "<p>" + game.htmlGuessDisplay + "</p>";
			document.querySelector("#word-to-guess").innerHTML = game.htmlGuessDisplay;


	// Once game starts, listening to user keystroke; checks against existing values in guessArray
		
			document.onkeyup = function(e) {
				game.userChoice = e.key;

			// If keystroke is isn't already present in guessArray it is added and then parsed to display without commas
				if (game.letterGuessArray.indexOf(game.userChoice) === -1) {
				    game.letterGuessArray.push(e.key);
				    game.letterGuessDisplay = game.letterGuessArray.join(" ");

				// Keystroke guesses are injected back into HTML
				    var htmlLettersGuessed = "<p>You chose: " + game.letterGuessDisplay + "</p>";
				    document.querySelector("#letters-guessed").innerHTML = htmlLettersGuessed;

				// Keystroke is checked against wordToGuessArray, if it does not exist the # Remaining guesses counter moves down
				if (game.wordToGuessArray.indexOf(game.userChoice) === -1) {
						game.remainingGuesses--;
						var htmlGuessNum = "<p>Remaining guesses: "+ game.remainingGuesses + "</p>";
						document.querySelector("#guesses-remaining").innerHTML = htmlGuessNum;
				}

				// Iterate through letters guessed and change each that is found in the wordToGuessArray from an underscore to a letter in
				
				for (var i = 0; i < game.wordToGuessArray.length; i++) {
					if (game.letterGuessArray.indexOf(game.wordToGuessArray[i]) === -1) {
						game.underscoreGuessArray[i] = "_";
					}
					else {
						game.underscoreGuessArray[i] = game.wordToGuessArray[i];
						}
					}
					game.htmlGuessDisplay = game.underscoreGuessArray.join(" ");
					game.htmlGuessDisplay = "<p>" + game.htmlGuessDisplay + "</p>";
					document.querySelector("#word-to-guess").innerHTML = game.htmlGuessDisplay;
					console.log(game.htmlGuessDisplay)

					}

				}
			}
		}
	





