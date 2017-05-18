


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

	//Resets user command message
		resetCommand: function(){
			this.remainingGuesses=8;
			var htmlCommand = "<span>Guess a letter to solve the puzzle</span>";
			document.querySelector("#user-command").innerHTML = htmlCommand;
		},

		resetRemainingGuesses: function (){
			this.remainingGuesses=8;
			var htmlGuessNum = "<p>Remaining guesses: "+ this.remainingGuesses + "</p>";
			document.querySelector("#guesses-remaining").innerHTML = htmlGuessNum;
		},
	// Inject number of wins and losses	to html
		setWinsLosses: function(){
			var htmlWinNum = "<p>Number of wins: "+ this.winCount + "</p>";
			document.querySelector("#wins").innerHTML = htmlWinNum;
			var htmlLossNum = "<p>Number of losses: "+ this.lossCount + "</p>";
			document.querySelector("#losses").innerHTML = htmlLossNum;
		},

		chooseRandGuessWord: function(){
			this.wordToGuess = this.wordsArray[Math.floor(Math.random() * this.wordsArray.length)];
			console.log(this.wordToGuess);
		},

		guessWordToArrays: function(){
			this.wordToGuessArray = Array.from(this.wordToGuess);
			for (var i = 0; i < this.wordToGuessArray.length; i++)
				this.underscoreGuessArray[i] = "_";
		},

		displayUnderscoreArray: function(callback) {
			this.htmlGuessDisplay = this.underscoreGuessArray.join(" ");
			this.htmlGuessDisplay = "<p>" + this.htmlGuessDisplay + "</p>";
			document.querySelector("#word-to-guess").innerHTML = this.htmlGuessDisplay;
			console.log("displayed underscore!");
			callback && callback();
			/*if(typeof callback == 'undefined' || callback == null)
            callback()
        else
            alert('argh');*/
		},
		
		letterGuessesToHTML: function(){
			var htmlLettersGuessed = "<p>You chose: " + this.letterGuessDisplay + "</p>";
			document.querySelector("#letters-guessed").innerHTML = htmlLettersGuessed;
		},

		checkKeyAgainstWord: function(){
			if (this.wordToGuessArray.indexOf(this.userChoice) === -1) {
				this.remainingGuesses--;
				var htmlGuessNum = "<p>Remaining guesses: "+ this.remainingGuesses + "</p>";
				document.querySelector("#guesses-remaining").innerHTML = htmlGuessNum;
				}
		},

		underscoreToLetter: function(){
			for (var i = 0; i < game.wordToGuessArray.length; i++) {
				if (game.letterGuessArray.indexOf(game.wordToGuessArray[i]) === -1) {
				game.underscoreGuessArray[i] = "_";
				}
				else {
				game.underscoreGuessArray[i] = game.wordToGuessArray[i];
				}
			}
		},



		playAgainCommand: function(){
			var htmlCommand = "<span>Hit 'S' to play again!</span>";
			document.querySelector("#user-command").innerHTML = htmlCommand;
		},

		gameWin: function(){
			this.gameStatus=false;
			this.winCount++;
			var htmlWinNum = "<p>Number of wins: "+ this.winCount + "</p>";
			document.querySelector("#wins").innerHTML = htmlWinNum;
			this.youWin();
			var timeoutID = window.setTimeout(20000);
			this.resetGame();
		},

		youWin: function(){
			var htmlHeader = "<span>You Win!</span>";
			document.querySelector("#header").innerHTML = htmlHeader;
			window.alert("You win! Play again?");
		},

		gameLose: function(){

			this.lossCount++;
			var htmlLossNum = "<p>Number of losses: "+ this.lossCount + "</p>";
			document.querySelector("#losses").innerHTML = htmlLossNum;
			this.youLose();
			this.resetGame();
		},

		youLose: function(){
			var htmlHeader = "<span>You Lose!</span>";
			document.querySelector("#header").innerHTML = htmlHeader;
			window.alert("Ouch - you lost. Try again?");
		},

		checkForWinLoss: function(){
			if (this.underscoreGuessArray.indexOf("_") === -1) {
			this.gameWin();
			}

			else if (this.remainingGuesses == 0) {
			this.gameLose();
			};

		},

	//Resets Game
		resetGame: function() {
			this.playAgainCommand;
			this.letterGuessArray = [];
			this.letterGuessDisplay = "";
			this.underscoreGuessArray = [];
			this.resetRemainingGuesses();
			this.letterGuessesToHTML();
			this.chooseRandGuessWord();
			this.guessWordToArrays();
			this.displayUnderscoreArray();
		},
	}
	


// Listening to user keystrokes
	document.onkeyup = function(e) {
		game.userChoice = e.keyCode;
		console.log(game.userChoice);

	// Game starts if user hits spacebar
		if (game.userChoice === 32) {
			game.gameStatus = true;
			console.log(game.gameStatus);
		
		// Initialize game

			game.resetCommand();
			game.setWinsLosses();
			game.resetGame();

		/* // Populate remaining guesses area
			game.resetRemainingGuesses();


		// Randomly chooses a word from wordsArray
			game.chooseRandGuessWord();

		// Converts chosen word into an array, creates an underscore array of same length
			game.guessWordToArrays();

		// Turns underscoreGuessArray into a single variable with spaces between each underscore for HTML display, then adds HTML and injects
			game.displayUnderscoreArray(); */


	// Once game starts, listening to user keystroke; checks against existing values in guessArray
		
			document.onkeyup = function(e) {
				game.userChoice = e.key;

			// If keystroke is isn't already present in guessArray it is added and then parsed to display without commas
				if (game.letterGuessArray.indexOf(game.userChoice) === -1) {
				    game.letterGuessArray.push(e.key);
				    game.letterGuessDisplay = game.letterGuessArray.join(" ");

				// Keystroke guesses are injected back into HTML
				game.letterGuessesToHTML();

				// Keystroke is checked against wordToGuessArray, if it does not exist the # Remaining guesses counter moves down
				game.checkKeyAgainstWord();

				// Iterate through letters guessed and change each that is found in the wordToGuessArray from an underscore to a letter
				game.underscoreToLetter();
				
				// Update html guess display
				game.displayUnderscoreArray( function(){
					game.checkForWinLoss();
					}
				);
				
				// Check underscoreGuessArray for underscores, if you find none, player has won -- end game and +1 to wins, display to html
				//game.checkForWinLoss();

				// Check number of guesses, if = 0, end game and +1 to losses, display to html


				// If game status = false, reset game

				}
			}
		}
	}

	





