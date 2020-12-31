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

// Get the URL to the GIFs
getGifURL();