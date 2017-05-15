






// Here we create the HTML that will be injected into our div and displayed on the page.
          var html = "<p>You chose: " + userChoice + "</p>Computer chose: " + computerChoice + "<p>wins: " + winScore + "</p>" +
          "<p>losses: " + lossScore + "</p>" +
          "<p>ties: " + tieScore + "</p>";

          // Injecting the HTML we just created into our div and updating the game information on our page.
          document.querySelector("#game").innerHTML = html; 