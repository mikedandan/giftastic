$(document).ready(function () {

    var topics = ["Marvel Agents of Shield", "Empire", "Orange is the New Black", "Scandal", "The Avengers", "House of Cards", "DJ Khaled", "Kim Kardashian"];

    function displayGifs() {

        $("#shows-view").empty();

        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;

            console.log(results);

            //Looping over every result item
            for (var i = 0; i < results.length; i++) {


                //creating a div with the class item
                var showDiv = $("<div class ='item'>");
                //storing the result items rating
                var rating = results[i].rating;

                // if (results[i].rating !== "r") {

                var p = $("<p>").text("Rating: " + rating);
                //creating a image tag
                var tvShowImg = $("<img>");

                tvShowImg.attr("src", results[i].images.fixed_height_still.url);
                tvShowImg.attr("data-state", "still");
                tvShowImg.attr("data-still", results[i].images.fixed_height_still.url);
                tvShowImg.attr("data-animate", results[i].images.fixed_height.url);
                tvShowImg.attr("class", "show-input");

                showDiv.prepend(tvShowImg);
                showDiv.prepend(p);
                $("#shows-view").append(showDiv);
                $("#show-text").text("Click on an image below to see it animate! Click again to pause!");
                                
            }

        });

    };

    // Render buttons from array.

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var b = $("<button>");
            b.attr("data-name", topics[i]);
            b.addClass("tvButton")
            b.text(topics[i]);
            $("#buttons-view").append(b);
        };
    };

    // When new TV Show is submitted, add to list of buttons.

    $("#add-button").on("click", function (event) {

        event.preventDefault();

        var tvShow = $("#show-input").val().trim();

        topics.push(tvShow);
        renderButtons();

    });

    //Click to animate GIF.
    $(document).on("click", "img", animateGif);


    function animateGif() {

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log(this);
        }

        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }
    };



    $(document).on("click", ".tvButton", displayGifs);

    renderButtons();

});
