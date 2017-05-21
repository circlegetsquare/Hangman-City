var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-2.2.0.min.js';
script.type = 'text/javascript';

//$(document).ready(function() {
// Game Object

	var game = {
		letterGuessArray: [],
		letterGuessDisplay: "",
		wordsArray: ["JOHANNESBURG", "MUMBAI", "JAKARTA", "RIO DE JANEIRO", "NEW DELHI", "BOGOTA", "KUALA LUMPUR", "TEL AVIV", "BOSTON", "DUBAI", "MILAN", "MIAMI", "CAIRO", "BUENOS AIRES", "MUNICH", "SAO PAULO", "TAIPEI", "MOSCOW", "MEXICO CITY", "ZURICH", "SHANGHAI", "BANGKOK", "SAN FRANCISCO", "SYDNEY", "FRANKFURT", "HONG KONG", "SEOUL", "WASHINGTON DC", "TORONTO", "BEIJING", "BERLIN", "SINGAPORE", "BRUSSELS", "LOS ANGELES", "TOKYO", "PARIS", "LONDON", "NEW YORK", "BARCELONA", "INSTANBUL"],
		wordToGuess: "",
		wordToGuessArray: [],
		winCount: 0,
		lossCount: 0,
		remainingGuesses: 0,
		htmlGuessDisplay: "",
		userChoice: "",
		keyCheck: null,
		underscoreGuessArray: [],
		htmlImage: "",

	//Resets user command message
		setCommand: function(){
			game.remainingGuesses=8;
			//var htmlCommand = "<span>Guess a letter to solve the puzzle.</span>";
			var htmlCommand = "";
			document.querySelector("#user-command").innerHTML = htmlCommand;
		},

		resetCommand: function(){
			game.remainingGuesses=8;
			//var htmlCommand = "<span>Guess a letter to solve another puzzle.</span>";
			var htmlCommand = "";
			document.querySelector("#user-command").innerHTML = htmlCommand;
		},

		resetRemainingGuesses: function(){
			game.remainingGuesses=8;
			var htmlGuessNum = "<p>GUESSES LEFT: "+ game.remainingGuesses + "</p>";
			document.querySelector("#guesses-remaining").innerHTML = htmlGuessNum;
		},
	// Inject number of wins and losses	to html
		setWinsLosses: function(){
			var htmlWinNum = "<p>Wins: "+ game.winCount + "</p>";
			document.querySelector("#wins").innerHTML = htmlWinNum;
			var htmlLossNum = "<p>Losses: "+ game.lossCount + "</p>";
			document.querySelector("#losses").innerHTML = htmlLossNum;
		},

		setCurrentWordText: function(){
			document.querySelector("#current-word").innerHTML = "<p></p>";
		},

		chooseRandGuessWord: function(){
			game.wordToGuess = game.wordsArray[Math.floor(Math.random() * game.wordsArray.length)];
			//console.log(game.wordToGuess);
		},

		guessWordToArrays: function(){
			game.wordToGuessArray = Array.from(game.wordToGuess);
			for (var i = 0; i < game.wordToGuessArray.length; i++)
				if (game.wordToGuessArray[i] === " ") {
					game.underscoreGuessArray[i] = "&nbsp";
					}
					else {
					game.underscoreGuessArray[i] = "_";
					}
			},

		displayUnderscoreArray: function(callback) {
			game.htmlGuessDisplay = game.underscoreGuessArray.join(" ");
			game.htmlGuessDisplay = "<p>" + game.htmlGuessDisplay + "</p>";
			document.querySelector("#word-to-guess").innerHTML = game.htmlGuessDisplay;
			callback && callback();
		},
		
		letterGuessesToHTML: function(){
			var htmlLettersGuessed = "<p><strong>LETTERS GUESSED</strong></p><hr><p> " + game.letterGuessDisplay + "</p>";
			document.querySelector("#letters-guessed").innerHTML = htmlLettersGuessed;
		},

		checkKeyAgainstWord: function(){
			if (game.wordToGuessArray.indexOf(game.userChoice) === -1 ) {
				game.remainingGuesses--;
				var htmlImage = 'assets/images/hangman-' + game.remainingGuesses + '.svg';
				$('#hang-image').attr('src', htmlImage);
				var htmlGuessNum = "<p>GUESSES LEFT: "+ game.remainingGuesses + "</p>";
				document.querySelector("#guesses-remaining").innerHTML = htmlGuessNum;

				}
		},

		underscoreToLetter: function(){
			for (var i = 0; i < game.wordToGuessArray.length; i++) {
				if (game.wordToGuessArray[i] === " ") {
				game.underscoreGuessArray[i] = "&nbsp";
				}
				else if (game.letterGuessArray.indexOf(game.wordToGuessArray[i]) === -1) {
				game.underscoreGuessArray[i] = "_";
				}
				else {
				game.underscoreGuessArray[i] = game.wordToGuessArray[i];
				}
			}
		},


		checkForWinLoss: function(){
			if (game.underscoreGuessArray.indexOf("_") === -1) {
			game.gameWin();
			}

			else if (game.remainingGuesses == 0) {
			game.gameLose();
			};

		},

		gameWin: function(){
			game.winCount++;
			var htmlWinNum = "<p>Wins: "+ game.winCount + "</p>";
			document.querySelector("#wins").innerHTML = htmlWinNum;
			setTimeout(game.youWin, 100);
			//game.youWin();
		},

		gameLose: function(){ 
			game.lossCount++;
			var htmlLossNum = "<p>Losses: "+ game.lossCount + "</p>";
			document.querySelector("#losses").innerHTML = htmlLossNum;
			setTimeout(game.youLose, 300)
		},

		youWin: function(){
			window.alert("You win! Play again?");
			game.resetGame();
		},

		youLose: function(){
			window.alert("Ouch - you lost. Try again?");
			game.resetGame();
		},


	//Resets Game
		resetGame: function() {
			game.playAgainCommand;
			game.letterGuessArray = [];
			game.letterGuessDisplay = "";
			game.underscoreGuessArray = [];
			game.resetRemainingGuesses();
			game.resetCommand();
			game.letterGuessesToHTML();
			game.chooseRandGuessWord();
			game.guessWordToArrays();
			game.displayUnderscoreArray();
			var htmlImage = 'assets/images/hangman-8.svg';
			$('#hang-image').attr('src', htmlImage);
		},
	};
	


// Listening to user keystrokes
	document.onkeyup = function(e) {
		game.userChoice = e.keyCode;
		//console.log(game.userChoice);

	// Game starts if user hits spacebar
		if (game.userChoice === 32) {
		
		// Initialize game
			game.resetGame();
			game.setWinsLosses();
			game.setCommand();
		

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
				game.userChoice = e.key.toUpperCase();
				game.keyCheck = e.keyCode;
				//game.userChoice = game.userChoice.toUpperCase();
				//console.log("key: " + game.userChoice);

			if (game.keyCheck >= 65 && game.keyCheck<= 90) {

			// If keystroke is isn't already present in guessArray and there are guesses left, it is added and then parsed to display without commas
				if (game.letterGuessArray.indexOf(game.userChoice) === -1 && game.remainingGuesses > 0) {
				    game.letterGuessArray.push(e.key.toUpperCase());
				    game.letterGuessDisplay = game.letterGuessArray.join(" ");
				    game.letterGuessDisplay = game.letterGuessDisplay.toUpperCase();

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
};
	//});
	

	





