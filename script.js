//      ARRAYS
var cardsArray = []; // Will hold the URLs fr all cards in te grid
var urlArray = []; // Will hold the URL of card one and card two
var indexArray = []; // Will hold the index of card one and card two

//      STRINGS/CHAR
var userName = ''; // User's name
var mode = ''; // Type of game selected [EASY, TIMED, CHALLENGE]
var firstPick = ""; // Index of the first card picked
var secondPick = ""; // Index of the second card picked

//      Number/Integers
var pairs = 2; // Pair of cards that will be in the grid
var pairsMatched = 0; // Number of pairs matched in a game



$(document).ready(function () {

   // Start a game
   function startGame(pairs) {

    // Reseting variables for a new game
    finishGame = false;
    tries = 0;
    pairsMatched = 0;
    urlArray = [];
    indexArray = [];

    console.log("Starting level " + level + " in mode " + mode);

    // Setting variables for the TIMED and CHALLENGE modes 
    if (mode === 'timed' || mode === 'challenge') {

        // Calculate level numer based on the number of PAIRS
        level = pairs - 1;

        // Calculate amount of time per game based on the number of PAIRS
        switch (parseInt(pairs)) {
            case 2:
                timeToBeat = 20;
                break;

            case 3:
                timeToBeat = 32;
                break;

            case 4:
                timeToBeat = 39;
                break;

            case 5:
                timeToBeat = 48;
                break;

            case 6:
                timeToBeat = 59;
                break;

            case 7:
                timeToBeat = 72;
                break;

            case 8:
                timeToBeat = 87;
                break;

            case 9:
                timeToBeat = 104;
                break;

            case 10:
                timeToBeat = 123;
                break;
        }

        // console.log("TIme for level: " + level + " is " + time);

        time = timeToBeat;
    };

    // Get the URL to the GIFs
    getGifURL();

    //Update screen
    updateScreen()

    // Log all variables... use for troubleshooting only
    // allVariablesInfo()
};

    // Use the API to get the URL to the GIFs used on the card's front
    function getGifURL() {
        // Empty array with URL of cards
        cardsArray = [];

        // Superhero API
        const APIKey = '10161297457820113';

        var queryURL = `https://cors-anywhere.herokuapp.com/http://superheroapi.com/api.php/${APIKey}/search/man`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            
            // Get the URL of the image into the cardsArray... twice!
            // note [22,23,50,57] are numbers to avoid, no Imgs available

            // Build cardsArray with URL to character images
            for (let p = 0; p < pairs; p++) {

                // Generate random number between 1 and 63 - to randomize character image
                var index = Math.floor(Math.random() * 63) + 1;

                // Confirm the index is not one of the ones with missing images
                switch (index) {
                    case 22:
                    case 23:
                    case 50:
                    case 57:
                        // No images for these indexes... try again.
                        console.log("Selected: " + index + "  Trying again");

                        // Reduce the iteration variable to get a new value
                        p--;
                        break;

                    default:
                        // For all other cases push the URL to the image into cardsArray... twice! 
                        cardsArray.push(response.results[index].image.url);
                        cardsArray.push(response.results[index].image.url);
                        console.log('This is the cardsArray', cardsArray)

                        break;
                }
            }

            // Randomize the positions of the cardsArray
            // shuffleArray(cardsArray);

            // Show the BACK of the cards
            displayCards();
        });
        //////////////////////////////////////////////////////////////

    };

        // Show the cards in the board
        function displayCards() {

            // Resize the container of the cards
            switch (parseInt(pairs)) {
                case 2:
                    // For 2 pairs only (4 cards)
                    var boxWidth = 250;
                    break;
    
                case 3, 4:
                    // For 3 pairs (6 cards) and 4 pairs (8 cards)
                    var boxWidth = 370;
                    break;
    
                default:
                    // For 5 pairs or more
                    var boxWidth = 490;
                    break;
            }
    
            //console.log("Pairs: " + pairs + "   Width: " + boxWidth);
    
            // Set the with of the cards grid
            $("#gifBox").css("max-width", boxWidth);
    
            // Remove all the existing cards
            $("#gifs").html("");
    
            // For each GIF append an element to the DOM
            for (var c in cardsArray) {
    
                // Create a CARD div
                var cardDiv = $("<div>").addClass("card m-2");
    
                // Append the character image to the front of the card, but HIDE this image - this to mimic the fact of the card being "facing donw"
                var cardImg = $("<img>").attr("src", cardsArray[c]).attr("id", "frnt" + c).css("display", "none").addClass("staticgif card-img-top").appendTo(cardDiv);
    
                // Append the image of the back if the card - this to mimic the fact of the card being "facing donw"
                var cardback = $("<img>").attr("src", "./assets/images/card_back.png").attr("id", "back" + c).attr("data-url", cardsArray[c]).addClass("staticgif card-img-top").appendTo(cardDiv);
    
                // Append each card
                $("#gifs").append(cardDiv);
            };
    
            // Start the countdown clock for the TIMED and CHALLENGE modes 
            if (mode === 'timed' || mode === 'challenge') {
                // console.log("calling the clock with " + time + " seconds");
    
                timerRun(time);
    
                $("#box-clock").show();
    
            } else {
    
            };
    
        };




    // Update the screen
    function updateScreen() {

        console.log("Updating SCREEN");

        $("#pairsm").text(pairsMatched);
        $("#tries").text(tries);
        $("#level").text(level);

        switch (mode) {
            case 'easy': // EASY mode
                console.log("EASY MODE");
                $("#welcome").hide();
                $("#game").show();

                $("#box-clock").hide();
                $("#box-level").hide();

                $("#app-logo").css("text-align", "start");
                $("#app-logo-img").css("width", "290px");
                $("#app-title").hide();

                updateStats();
                break;

            case 'timed': // TIMED mode
                console.log("TIMED MODE");
                $("#welcome").hide();
                $("#game").show();

                $("#box-clock").show();
                $("#box-level").hide();

                $("#app-logo").css("text-align", "start");
                $("#app-logo-img").css("width", "290px");
                $("#app-title").hide();

                updateStats();
                break;

            case 'challenge': // CHALLENGE mode
                console.log("CHALLENGE MODE");
                $("#welcome").hide();
                $("#game").show();

                $("#box-clock").show();
                $("#box-level").show();

                $("#app-logo").css("text-align", "start");
                $("#app-logo-img").css("width", "290px");
                $("#app-title").hide();

                updateStats();
                break;

            default: // NO mode... first load
                console.log("DEFAULT MODE");

                $('#nameInput').val(userName);

                $("#welcome").show();
                $("#game").hide();

                $("#app-logo").css("text-align", "center");
                $("#app-logo-img").css("width", "553px");
                $("#app-title").show();

                break;
        }
    };

        // Update player stats
        function updateStats() {

            // console.log("Updating STATS");
    
            $("#mode_lbl").text(mode.toLocaleUpperCase() + " MODE");
    
            if (!finishGame) {
                $("#pairsm").text(pairsMatched);
                $("#tries").text(tries);
                $("#level").text(level);
    
            } else {
                // If all pairs have been found in a game
    
                // Stop countdown timer
                timerStop();
    
                timeUsed = timeToBeat - time;
                overallTime = overallTime + timeUsed;
                overallTries = overallTries + tries;
                level = pairs - 1;
    
                // Prepare "you found all pairs" message on GameUpdate modal:
    
                // Clear all content
                $("#updateText").html("");
    
                // Add the star image
                var img = $("<img>").attr("src", "assets/images/star.png").attr("id", "updateImage").appendTo($("#updateText"));
    
                // Set the massage
                var msg = $("<div>").html("<h5>YOU FOUND ALL <br> THE MATCHES!</h5>");
    
                // Show the PLAY AGAIN button from Game Update modal
                $("#playAgain").show();
    
                // Hide the PLAY NEXT button from Game Update modal
                $("#playNext").hide();
    
                if (mode === 'challenge') {
    
                    // Hide the PLAY AGAIN button from Game Update modal
                    $("#playAgain").hide();
    
                    if (level === 10) { // All levels completed on CHALLENGE mode.
                        // console.log("HERE");
    
                        // Set the massage
                        msg = $("<div>").html("<h5>YOU FOUND ALL<br>THE MATCHES ON<br>ALL LEVELS!</h5>").appendTo($("#updateText"));
    
                    } else if (level < 9) { // Game done for CHALLENGE modes:
    
                        // Set the massage
                        msg = $("<div>").html("<h5>YOU FINISHED LEVEL " + level + "<br>GO TO THE NEXT ONE</h5>").appendTo($("#updateText"));
    
                        // Show the PLAY NEXT button from Game Update modal
                        $("#playNext").show();
    
                    }
                } else { // Game done for EASY and TIMED modes
    
                }
    
                // Updload the latest user data to Firebase
                uploadData();
    
                // Append message to modal
                $("#updateText").append(msg);
    
                // Display Game Update modal
                $("#modalGameUpdate").modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }
        };
    
    // ********************************
    // **        BUTTON logic        **
    // ********************************

    // Click on back of card
    $("#gifs").on("click", ".staticgif", function () {

        if (secondPick != "") {
            return;
        }

        // Save the ID of the clicked card
        // Making sure to remove the first 4 characters
        var choice = this.id.substr(4);

        // If the same card is clicked twice do nothing
        if (this.id.substr(4) === firstPick) {
            // console.log("repeated");
            return;
        }

        if (firstPick === "") {
            firstPick = choice;
        } else if (firstPick != "" && secondPick === "") {

            secondPick = choice;
        }

        // Hide the back of the card
        $("#back" + choice).hide();

        // Show the front of the card
        $("#frnt" + choice).show();

        // Get the URL for the card
        urlArray.push(this.dataset.url)

        // Get the INDEX for the card
        indexArray.push(choice);

        if (firstPick != "" && secondPick != "") {
            // Add a try to the list
            tries++;

            // Wait some time to show both cards and then follow up
            setTimeout(function () {
                if (urlArray[0] === urlArray[1]) {
                    // The cards match, hide both cards

                    // console.log("CARDS MATCH!!");

                    // Hiding the front of the card
                    $("#frnt" + indexArray[0]).css("visibility", "hidden");
                    $("#frnt" + indexArray[1]).css("visibility", "hidden");

                    // Add a pair matched to the list
                    pairsMatched++;

                    if (pairsMatched * 2 === cardsArray.length) {

                        // console.log("FINISHED ALL CARDS!");
                        finishGame = true;
                    }

                } else {
                    // The cards dont match, flip tham back
                    // console.log("Not a match");

                    // Hide the back of the card
                    $("#back" + indexArray[0]).show();
                    $("#frnt" + indexArray[0]).hide();
                    $("#back" + indexArray[1]).show();
                    $("#frnt" + indexArray[1]).hide();
                }

                // Empty the URL and index array
                urlArray = [];
                indexArray = [];

                // // Switch back that the first card was picked
                firstPick = "";
                secondPick = "";

                // Update the game stats
                updateStats();

            }, 2000); // Wait this many miliseconds after the second card is picked

        }

    });    

    // Player selects how many pairs to play with
    $("#play").click(function () {

        // Get the # of pairs from the input form
        pairs = parseInt($('#pairsInput').val().trim());

        console.log("Selected to play with " + pairs + " pairs.");

        // Hide the modal
        $("#modalPairs").modal("hide");

        // Start game
        startGame(pairs);
    });

    // Player selects play mode
    $(".btnPlay").on("click", function (e) {
        e.preventDefault();

        // If player has not entered name or country show elart message
        if ($('#nameInput').val() === "" || $('#countryInput').val() === "") {

            // Set error message on ALERT modal
            $("#errorText").text("YOU NEED TO ENTER A USERNAME AND A SELECT A VALID COUNTRY");

            // Display ALERT modal
            $("#modalAlert").modal({
                backdrop: 'static',
                keyboard: false
            });

            // Exit
            return;
        };

        // Save username 
        userName = $('#nameInput').val().trim();


        // Get the mode from the button selected
        mode = this.id;

        switch (mode) {
            // EASY mode
            case 'easy': // EASY mode

                // Show modalPairs to ask the player how many pairs
                $("#modalPairs").modal({
                    backdrop: 'static',
                    keyboard: false
                });

                // Don't show/need countdown timer
                timer = false;

                // Not challenge mode
                challenge = false;

                break;

            case 'timed': // TIMED mode

                // Show modalPairs to ask the player how many pairs
                $("#modalPairs").modal({
                    backdrop: 'static',
                    keyboard: false
                });

                // Show/need countdown timer
                timer = true;

                // Not challenge mode
                challenge = false;

                break;

            case 'challenge': // CHALLENGE mode

                // Start the challenge with 2 pairs
                pairs = 2;

                // Show/need countdown timer
                timer = true;

                // Enable challenge mode
                challenge = true;

                // Start game
                startGame(pairs);

                break;
        };

    });

// Get the URL to the GIFs
getGifURL();

// Update screen on the first load
updateScreen();

})