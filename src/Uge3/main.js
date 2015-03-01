$(document).ready(function () {
    $("#graph").hide();
});

$(function () {
    $("#button").click(clickHandler);
});

function clickHandler() {
    $("#button").addClass("buttonAnimate");
    doAnimate();
    return false;    
}

function doAnimate() {
    $("#graph").hide().delay(350).slideDown(800);
}

//
//function buttonclicked() {
//    // What (style) actions are taken when the button is clicked on
//    var image = document.getElementById("button");
//
//    if (image.style.float != "right") { //To avoid multiple animations...
//        $("#button").animate({/*marginTop:"+=70px"*/},1000, function() {
//           /* $("#top").fadeIn(300); */
//        });
//        
//    }
//}