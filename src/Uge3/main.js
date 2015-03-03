$(document).ready(function () {
/*    $("#graph").hide();
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
    $("#graph").delay(900).slideDown(800); // Bemærk, at slideDown kun virker, når elementet er skjult.
    Derfor kører animationen ikke mere end to gange!
}*/

$("#button").on("click", function() {
	$("#graph").slideToggle();
});

$("#current").load("http://www.nordpoolspot.com/#/nordic/table a[href*='SYS1/Daily/?view=table&curr=DKK']", function( response, status, xhr ) {
			var msg = "Response code: ";
		    $("#error").html( msg + xhr.status + " " + xhr.statusText );
		}).find("div[ng-bind*='value']").getValue(); 

$("#datatable").load("http://www.nordpoolspot.com/Market-data1/Elspot/Area-Prices/DK/Hourly/?view=table #datatable");

//$("#current").load("http://www.nordpoolspot.com/#/nordic/table a[href*='SYS1/Daily/?view=table&curr=DKK']").find("div[ng-bind*='value']").getValue();

});

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