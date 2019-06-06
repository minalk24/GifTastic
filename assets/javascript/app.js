$(document).ready(function(){

var topics = ["tom and Jerry","aaladin","mikey","tom and jerry"];



//onclick
$("#addButton").on("click",function(){
    event.preventDefault();
    var getUserInput = $("#addInput").val().trim();
    $("#addInput").val("");
    topics.push(getUserInput);
    console.log("getUserInput: ",getUserInput);
    console.log("Topics: ",topics)
    renderBtnFun();
});

// function
function renderBtnFun(){
    $(".renderBtn").empty();
    //for (x in topics){ 
        for (var i = 0; i < topics.length; i++) {
            var j = topics[i];
        var display = $(".renderBtn");
        var newBtn = $("<button>");
        newBtn.text(j).addClass("btn btn-primary");
        display.append(newBtn);
    }  
}
























});