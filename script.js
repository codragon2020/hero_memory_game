// Superhero API

const APIKey = '10161297457820113';

var queryURL = `https://cors-anywhere.herokuapp.com/http://superheroapi.com/api.php/${APIKey}/search/man`;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
})