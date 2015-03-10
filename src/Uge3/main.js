$(document).ready(function () {
	$("#button").on("click", function() {
		$("#graph").slideToggle();
	});

	var priceString = "Pris: "+(pricePerMWH[thisHour()]/1000).toFixed(3)+" kr/kWh ("+goodPrice(pricePerMWH[thisHour()])+")";
	$("#pricing").append(priceString);


	var currentUsage = "Forbrug indtil videre: "+usageCurrent().toFixed(2)+" kWh.";
	$("#currentUsage").append(currentUsage);
	var currentUsePerMin = "Du bruger nu: "+ratePerMin().toFixed(2)+" kWh/10 min";
	$("#ratePerMin").append(currentUsePerMin);
	var limit = 8.22;
	$("#limit").append("Din grænse: "+limit+" kWh.");
	$("#prognosis").append("Prognose: "+prognosis().toFixed(2)+" kWh.");
	$("#yesterUsage").append("Forbrug for i går: "+usageYesterday().toFixed(2)+" kWh.");
	
	// Smiley!
	
	var goodColor = {
			fillStyle: function() {
				if (usageCurrent() > limit) {return "red"}
				else if (prognosis() > limit) {return "yellow"}
				else {return "#44ff44"}
			}
	}
	
	// Set up!
	var a_canvas = document.getElementById("smiley");
	var context = a_canvas.getContext("2d");

	// Draw the face
	context.fillStyle = goodColor.fillStyle();
	context.beginPath();
	context.arc(145, 75, 80, 0, 2*Math.PI);
	context.closePath();
	context.fill();
	context.lineWidth = 2;
	context.stroke();
	context.fillStyle = "black";

	// Draw the left eye
	context.beginPath();
	context.arc(120, 55, 10, 0, 2*Math.PI);
	context.closePath();
	context.fill();

	// Draw the right eye
	context.beginPath();
	context.arc(169, 55, 10, 0, 2*Math.PI);
	context.closePath();
	context.fill();

	// Draw the mouth
	context.beginPath();
	context.arc(145, 85, 50, (7/8)*Math.PI, (17/8)*Math.PI, true);
	context.closePath();
	context.fill();
	context.beginPath();
	context.arc(145, 85, 46, (9/8)*Math.PI, (15/8)*Math.PI, true);
	context.closePath();
	context.fillStyle = goodColor.fillStyle();
	context.fill();

});

function thisMinute() {return new Date().getMinutes();};
function thisHour() { return new Date().getHours();};
function thisDay() {return new Date().getDay();};
function leftMinutes() {return 1440-60*thisHour()-thisMinute()-1};

var pricePerMWH = [194.13, 189.76,187.44,188.19,191.83,194.27,202.61,211.85,214.80,214.37,215.39,214.30,211.93,210.30,210.09,212.85,216.83,222.17,221.44,215.94,212.08,207.41,204.55,196.47];
var avgPricePerMWH = 211.08;

var forbrugDag1 = [3289,3213,3098,2979,2939,2942,2993,3176,3290,3373,3561,3733,3835,3878,3855,3988,4258,4492,4482,4285,4048,3849,3582,3416];
var forbrugDag2 = [3214,2996,2944,2941,3028,3103,3525,3865,4186,4338,4514,4526,4476,4448,4392,4429,4731,5175,5094,4724,4315,4123,3829,3530];
var forbrugDag3 = [3389,3277,3119,3034,3019,3081,3317,3639,3891,4066,4170,4135,4068,4046,3981,3970,4333,4813,4746,4324,4049,3795,3571,3380];
var avgForbrug = 3808.51;
var dagligAvgForbrug = 8.22;

function goodPrice(price) {
	if (price>=avgPricePerMWH) {
		$("#pricing").addClass("highPrice");
		return "høj";
	}
	else {
		$("#pricing").addClass("lowPrice")
		return "lav";
	}
}

function prognosis() {
	var present = usageCurrent();
	var future = leftMinutes()*(ratePerMin()/10);
	return present + future;
}

function usageCurrent() {
	var usage = 0;
	// hvilken dag skal vi kigge på...
	if (thisDay()%3 == 0) {
		var usageDay = forbrugDag1;
	}
	else if (thisDay()%3 == 1) {
		var usageDay = forbrugDag2;
	}
	else {
		var usageDay = forbrugDag3;
	}
	// tæller timeforbruget op til og med sidste time
	for (var i = 0; i<thisHour(); i++) {
		usage += (usageDay[i]*dagligAvgForbrug)/(avgForbrug*24);
	}
	// plusser forbruget per minute for denne time indtil videre
	usage = usage + thisMinute()*usageDay[thisHour()]*dagligAvgForbrug/(60*24*avgForbrug);
	return usage;
}

function usageYesterday() {
	var usage = 0;
	if (thisDay()%3 == 0) {
		var usageDay = forbrugDag3;
	}
	else if (thisDay()%3 == 1) {
		var usageDay = forbrugDag1;
	}
	else {
		var usageDay = forbrugDag2;
	}
	for (var i = 0; i<24; i++) {
		usage += (usageDay[i]*dagligAvgForbrug)/(avgForbrug*24);
	}
	return usage;
}

function ratePerMin() {
	// hvilken dag skal vi kigge på...
	if (thisDay()%3 == 0) {
		var usageDay = forbrugDag1;
	}
	else if (thisDay()%3 == 1) {
		var usageDay = forbrugDag2;
	}
	else {
		var usageDay = forbrugDag3;
	}
	var usage = usageDay[thisHour()]*dagligAvgForbrug/(6*24*avgForbrug);
	return usage;
}