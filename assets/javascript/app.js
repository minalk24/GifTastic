$(document).ready(function(){

    var topics = ["inside out", "popeye", "the lion king", "finding nemo"];

    renderBtnFun();

    //onclick
    $("#addButton").on("click", function () {
        event.preventDefault();
        var getUserInput = $("#addInput").val().trim();
        $("#addInput").val("");
        topics.push(getUserInput);
        console.log("getUserInput: ", getUserInput);
        console.log("Topics: ", topics)
        renderBtnFun();
    });

    // function
    function renderBtnFun() {
        $("#renderBtn").empty();
        for (var i = 0; i < topics.length; i++) {
            var j = topics[i];
            var displayInWrap = $("#renderBtn");
            var newBtn = $("<button>");
            //console.log(j);
            newBtn.text(j).addClass("btnList btn btn-primary");
            displayInWrap.append(newBtn);
        }
    }

    $("#renderBtn").on("click", ".btnList", function () {
        searchParam = $(this).text();
       
        var api = "https://api.giphy.com/v1/gifs/search?"
        var apiKey = "&api_key=hdLZ99k0fwSXFUwI8roD0vpPcG9I0tcO"
        var query = "&q=" + searchParam;
        searchQuery = api + apiKey + query;

        $.ajax({
            url: searchQuery,
            method: "GET"
        }).then(function (response){
            console.log(response.data);
            displayImg(response);

        });

    })

    function displayImg(getData) {

        var displayInWrap = $("#renderGif");
        displayInWrap.empty();

        for (i = 0; i < 10; i++) {
            //gif div created
            var gifThumbnail = $("<div>");
            var gifCaption = $('<div>');
            var gifRating = getData.data[i].rating;

            gifCaption.addClass('caption text-center').text("Rating : " + gifRating);

            gifThumbnail.addClass('thumbnail').append(gifCaption);

            var childGif = $("<img>");
            var gifSrcStill = getData.data[i].images.fixed_height_still.url;
            var gifSrcAnimate = getData.data[i].images.fixed_height.url;

            childGif.attr('src', gifSrcStill);
            childGif.attr("data-still", gifSrcStill)
            childGif.attr("data-animate", gifSrcAnimate)
            childGif.attr("data-state", "still")
            childGif.addClass("gifState");
            gifThumbnail.append(childGif);

            displayInWrap.append(gifThumbnail);

        }
    }

    $("#renderGif").on("click", ".thumbnail img", function () {
        console.log(" Image clicked");

        var getGifState = $(this).attr("data-state");


        if (getGifState == "still") {
            var getAnimateUrl = $(this).attr("data-animate")
            $(this).attr("data-state", "animate");
            $(this).attr("src", getAnimateUrl);

        } else {
            var getStillUrl = $(this).attr("data-still")
            $(this).attr("data-state", "still");
            $(this).attr("src", getStillUrl);
        }

    });


});