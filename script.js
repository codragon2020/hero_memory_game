
var mode = ''; // Type of game selected [EASY, TIMED, CHALLENGE]
var userName = ''; // User's name


var pairsMatched = 0; // Number of pairs matched in a game



$(document).ready(function () {

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
    })
}

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