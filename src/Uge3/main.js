var limit = 8.22;

//TIL MAIN_NY
var priceNew = getCookie("avgPrice");
var limitNew = getCookie("limit");
var regexFloat = /[+-]?\d+\.\d+/g;//Finds first set of floats

$(document).ready(function () {
    $("#button").on("click", function () {
        $("#graph").slideToggle();
    });

    $("#ratePerMin").on("click", function () {
        var foo = document.getElementById("ratePerMin").innerHTML;
        var fooFloat = parseFloat(foo.match(regexFloat));
        if (foo.search("bruger") > -1) { // Only now was it clicked 
            $("#ratePerMin").empty().append("Du betaler nu: " + (convertUsage(ratePerMin())*100).toFixed(2) + " øre/10 min.");
//            $("#ratePerMin").empty().append("Du betaler nu: " + (fooFloat*priceNew*100).toFixed(2) + " øre/10 min.");
        }
        else {
           $("#ratePerMin").empty().append("Du bruger nu: " + ratePerMin().toFixed(2) + " kWh/10 min.");
//            $("#ratePerMin").empty().append("Du bruger nu: " + (fooFloat/(priceNew*100)).toFixed(2) + " kWh/10 min.");
        }
    });

    $("#currentUsage").on("click", function () {
        var foo = document.getElementById("currentUsage").innerHTML;
        if (foo.search("kWh") > -1) {
            $("#currentUsage").empty().append("I forhold til grænsen: " + convertCurrentUsage().toFixed(2) + " %.");
        }
        else {
            $("#currentUsage").empty().append("Forbrug indtil videre: " + usageCurrent().toFixed(2) + " kWh.");
        }

    });

    $("#yesterUsage").on("click", function () {
        var foo = document.getElementById("yesterUsage").innerHTML;
        if (foo.search("kWh") > -1) {
            $("#yesterUsage").empty().append("Forbrug for i går: " + convertUsage(usageYesterday()).toFixed(2) + " kr.");
        }
        else {
            $("#yesterUsage").empty().append("Forbrug for i går: " + usageYesterday().toFixed(2) + " kWh.");
        }

    });

//    var priceString = "Pris: " + (pricePerMWH[thisHour()] / 1000).toFixed(3) + " kr/kWh (" + goodPrice(pricePerMWH[thisHour()]) + ")";
//    $("#pricing").append(priceString);

    $("#pricing").append("Pris: " + getCookie("avgPrice") + " øre/kWh");

    var currentUsage = "Forbrug indtil videre: " + usageCurrent().toFixed(2) + " kWh.";
    $("#currentUsage").append(currentUsage);
    var currentUsePerMin = "Du bruger nu: " + ratePerMin().toFixed(2) + " kWh/10 min.";
    $("#ratePerMin").append(currentUsePerMin);
//    $("#limit").append("Din grænse: " + limit + " kWh.");
    $("#limit").append("Din grænse: " + limitNew + " kWh.");
    $("#prognosis").append("Prognose: " + prognosis().toFixed(2) + " kWh.");
    $("#yesterUsage").append("Forbrug for i går: " + usageYesterday().toFixed(2) + " kWh.");
//    $("#yesterUsage").append("Forbrug for i går: ---- kWh.");
    
    //////////////NY TILFØJELSE////////////
    $("#dagForbrug").append("Dit daglige forbrug: " + getCookie("dagForbrug") + " kWh.");

    // Smiley!
    var goodColor = {
        fillStyle: function () {
//            if (usageCurrent() > limit) {
            if (usageCurrent() > limitNew) {
                return "red";
            }
//            else if (prognosis() > limit) {
            else if (prognosis() > limitNew) {
                return "yellow";
            }
            else {
                return "#44ff44";
            }
        }
    };

    // Set up!
    var a_canvas = document.getElementById("smiley");
    var context = a_canvas.getContext("2d");

    // Draw the face
    context.fillStyle = goodColor.fillStyle();
    context.beginPath();
    context.arc(145, 90, 80, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = "black";

    // Draw the left eye
    context.beginPath();
    context.arc(120, 70, 10, 0, 2 * Math.PI);
    context.closePath();
    context.fill();

    // Draw the right eye
    context.beginPath();
    context.arc(169, 70, 10, 0, 2 * Math.PI);
    context.closePath();
    context.fill();

    // Draw the mouth
    drawMouth();

    function drawMouth() {
//        if (usageCurrent() > limit) { //Sad smiley
        if (usageCurrent() > limitNew) { //Sad smiley
            context.beginPath();
            context.arc(145, 170, 50, (14 / 8) * Math.PI, (10 / 8) * Math.PI, true);
            context.closePath();
            context.fill();
            context.beginPath();
            context.arc(145, 170, 46, (14 / 8) * Math.PI, (10 / 8) * Math.PI, true);
            context.closePath();
            context.fillStyle = goodColor.fillStyle();
            context.fill();
        }
//        else if (prognosis() > limit) { //Neutral smiley
        else if (prognosis() > limitNew) { //Neutral smiley
            context.beginPath();
            context.moveTo(120, 135);
            context.lineTo(169, 135);
            context.lineWidth = 3;
            context.strokeStyle = 'black';
            context.stroke();
        }
        else { //Happy smiley
            context.beginPath();
            context.arc(145, 100, 50, (7 / 8) * Math.PI, (17 / 8) * Math.PI, true);
            context.closePath();
            context.fill();
            context.beginPath();
            context.arc(145, 100, 46, (7 / 8) * Math.PI, (17 / 8) * Math.PI, true);
            context.closePath();
            context.fillStyle = goodColor.fillStyle();
            context.fill();
        }
    }
});

function saveSetup() {
    var dagForbrugC = document.getElementById("dagForbrugCookie").value;
    var limitC = document.getElementById("limitCookie").value;
    var avgPriceC = document.getElementById("avgPriceCookie").value;

    document.cookie = "limit=" + limitC;
    document.cookie = "avgPrice=" + avgPriceC;
    document.cookie = "dagForbrug=" + dagForbrugC;

    window.location.assign("main_ny.html"); //Redirect to the main page.
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        ;
    }
    return "";
}

//////////////NY TILFØJELSE///////////////
function chkState(checkbox) {
    var foo = document.getElementById("ratePerMin").innerHTML;
    var fooFloat = parseFloat(foo.match(regexFloat));
    if (checkbox.checked) {
        if (foo.search("bruger") > -1) {
            $("#ratePerMin").empty().append("Du bruger nu: " + (fooFloat + 4.8).toFixed(2) + " kWh/10 min."); 
        }
        else {
            $("#ratePerMin").empty().append("Du betaler nu: " + (fooFloat + 4.8*priceNew*100).toFixed(2) + " øre/10 min.");
        }
    }
    else if (foo.search("bruger") > -1) {
        $("#ratePerMin").empty().append("Du bruger nu: " + (fooFloat - 4.8).toFixed(2) + " øre/10 min.");
    }
    
    else {
        $("#ratePerMin").empty().append("Du betaler nu: " + (fooFloat - 4.8*priceNew*100).toFixed(2) + " øre/10 min.");
    }
}

function thisMinute() {
    return new Date().getMinutes();
}
;
function thisHour() {
    return new Date().getHours();
}
;
function thisDay() {
    return new Date().getDay();
}
;
function leftMinutes() {
    return 1440 - 60 * thisHour() - thisMinute() - 1;
}
;

var pricePerMWH = [194.13, 189.76, 187.44, 188.19, 191.83, 194.27, 202.61, 211.85, 214.80, 214.37, 215.39, 214.30, 211.93, 210.30, 210.09, 212.85, 216.83, 222.17, 221.44, 215.94, 212.08, 207.41, 204.55, 196.47];
var avgPricePerMWH = 211.08;

var forbrugDag1 = [3289, 3213, 3098, 2979, 2939, 2942, 2993, 3176, 3290, 3373, 3561, 3733, 3835, 3878, 3855, 3988, 4258, 4492, 4482, 4285, 4048, 3849, 3582, 3416];
var forbrugDag2 = [3214, 2996, 2944, 2941, 3028, 3103, 3525, 3865, 4186, 4338, 4514, 4526, 4476, 4448, 4392, 4429, 4731, 5175, 5094, 4724, 4315, 4123, 3829, 3530];
var forbrugDag3 = [3389, 3277, 3119, 3034, 3019, 3081, 3317, 3639, 3891, 4066, 4170, 4135, 4068, 4046, 3981, 3970, 4333, 4813, 4746, 4324, 4049, 3795, 3571, 3380];
var avgForbrug = 3808.51;
var dagligAvgForbrug = 8.22;

function goodPrice(price) {
    if (price >= avgPricePerMWH) {
        $("#pricing").addClass("highPrice");
        return "høj";
    }
    else {
        $("#pricing").addClass("lowPrice");
        return "lav";
    }
}

function prognosis() {
    var present = usageCurrent();
    var future = leftMinutes() * (ratePerMin() / 10);
    return present + future;
}

function usageCurrent() {
    var usage = 0;
    // hvilken dag skal vi kigge på...
    if (thisDay() % 3 === 0) {
        var usageDay = forbrugDag1;
    }
    else if (thisDay() % 3 === 1) {
        var usageDay = forbrugDag2;
    }
    else {
        var usageDay = forbrugDag3;
    }
    // tæller timeforbruget op til og med sidste time
    for (var i = 0; i < thisHour(); i++) {
        usage += (usageDay[i] * dagligAvgForbrug) / (avgForbrug * 24);
    }
    // plusser forbruget per minute for denne time indtil videre
    usage = usage + thisMinute() * usageDay[thisHour()] * dagligAvgForbrug / (60 * 24 * avgForbrug);
    return usage;
}

function usageYesterday() {
    var usage = 0;
    if (thisDay() % 3 === 0) {
        var usageDay = forbrugDag3;
    }
    else if (thisDay() % 3 === 1) {
        var usageDay = forbrugDag1;
    }
    else {
        var usageDay = forbrugDag2;
    }
    for (var i = 0; i < 24; i++) {
        usage += (usageDay[i] * dagligAvgForbrug) / (avgForbrug * 24);
    }
    return usage;
}

function ratePerMin() {
    // hvilken dag skal vi kigge på...
    if (thisDay() % 3 === 0) {
        var usageDay = forbrugDag1;
    }
    else if (thisDay() % 3 === 1) {
        var usageDay = forbrugDag2;
    }
    else {
        var usageDay = forbrugDag3;
    }
    var usage = usageDay[thisHour()] * dagligAvgForbrug / (6 * 24 * avgForbrug);
    return usage;
}

function convertCurrentUsage() {
//    var foo = document.getElementById("limit").innerHTML.match(regexFloat); //Finds first set of float numbers
    return usageCurrent() / limitNew * 100;
}

function convertUsage(func) { //Give one of above functions as parameter
    return func * pricePerMWH[thisHour()] / 1000;
}