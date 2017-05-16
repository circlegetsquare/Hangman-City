


// Game Object

	var game = {
		letterGuessArray: [],
		letterGuessDisplay: "",
		wordsArray: ["doggie", "cat"],
		gameStatus: false,
		wordToGuess: "",
		wordToGuessArray: [],
		winCount: 0,
		lossCount: 0,
		remainingGuesses: 0,
		htmlGuessDisplay: "",
		userChoice: "",
		underscoreGuessArray: [],

		resetRemainingGuesses: function (){
			this.remainingGuesses=8;
			var htmlGuessNum = "<p>Remaining guesses: "+ this.remainingGuesses + "</p>";
			document.querySelector("#guesses-remaining").innerHTML = htmlGuessNum;
		},

		setWinsLosses: function(){
			var htmlWinNum = "<p>Number of wins: "+ this.winCount + "</p>";
			document.querySelector("#wins").innerHTML = htmlWinNum;
			var htmlLossNum = "<p>Number of losses: "+ this.lossCount + "</p>";
			document.querySelector("#losses").innerHTML = htmlLossNum;
		},

		chooseRandGuessWord: function(){
			game.wordToGuess = this.wordsArray[Math.floor(Math.random() * game.wordsArray.length)];
			console.log(game.wordToGuess);
		},

		resetCommand: function(){
			this.remainingGuesses=8;
			var htmlCommand = "<span>Guess a letter to solve the puzzle</span>";
			document.querySelector("#user-command").innerHTML = htmlCommand;
		},

		playAgainCommand: function(){
			this.remainingGuesses=8;
			var htmlCommand = "<span>Hit 'S' to play again!</span>";
			document.querySelector("#user-command").innerHTML = htmlCommand;
		},

		youWin: function(){
			var htmlHeader = "<span>You Win!</span>";
			document.querySelector("#header").innerHTML = htmlHeader;
		},

		youLose: function(){
			var htmlHeader = "<span>You Lose!</span>";
			document.querySelector("#header").innerHTML = htmlHeader;
		},
	}

// Listening to user keystrokes
	document.onkeyup = function(e) {
		game.userChoice = e.key;
		console.log(game.userChoice);

	// Game starts if user hits spacebar
		if (game.userChoice === "s") {
			game.gameStatus = true;
			console.log(game.gameStatus);
			
		//Resets user command message
			game.resetCommand();

		// Populate remaining guesses area
			game.resetRemainingGuesses();

		// Populate number of wins and losses		
			game.setWinsLosses();

		// Randomly chooses a word from wordsArray
			game.chooseRandGuessWord();

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
				
				// Update html guess display
				game.htmlGuessDisplay = game.underscoreGuessArray.join(" ");
				game.htmlGuessDisplay = "<p>" + game.htmlGuessDisplay + "</p>";
				document.querySelector("#word-to-guess").innerHTML = game.htmlGuessDisplay;
				

				// Check underscoreGuessArray for underscores, if you find none, player has won -- end game and +1 to wins, display to html
				if (game.underscoreGuessArray.indexOf("_") === -1) {
					game.gameStatus=false;
					game.winCount++;
					var htmlWinNum = "<p>Number of wins: "+ game.winCount + "</p>";
					document.querySelector("#wins").innerHTML = htmlWinNum;
					game.youWin();
					game.playAgainCommand();
					//game.resetGuesses();
				}

				// Check number of guesses, if = 0, end game and +1 to losses, display to html
				else if (game.remainingGuesses == 0) {
					game.gameStatus=false;
					game.lossCount++;
					var htmlLossNum = "<p>Number of losses: "+ game.lossCount + "</p>";
					document.querySelector("#losses").innerHTML = htmlLossNum;
					game.youLose();
					game.playAgainCommand();
					//game.resetGuesses();
				}
			}
		}
	}
}
	





