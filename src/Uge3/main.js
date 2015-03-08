$(document).ready(function () {
	$("#button").on("click", function() {
		$("#graph").slideToggle();
	});
	
	/*$('#csvdata').CSVToTable('data.csv' , 
			{ 
		separator: ";",
		startLine: 1,
		headers: ['Time', 'Pris (DKK)'],
		loadingText: "Henter data..."
			});*/
	//var priceSpan = document.createElement("SPAN").append(pricePerKWH[hours]);
	$("#currentPrice").append(pricePerKWH[hours]);
	//$("#csvdata").append(priceSpan);
	
	var priceStatus = "Prisen er " + goodPrice(pricePerKWH[hours]);
	$("#priceStatus").append(priceStatus);
	
	var priceString = "Pris for el pt: "+pricePerKWH[hours]+" kWh (normalt)";
	$("#pricing").append(priceString);
});

var hours = new Date().getHours();

var pricePerKWH = [194.13, 189.76,187.44,188.19,191.83,194.27,202.61,211.85,214.80,214.37,215.39,214.30,211.93,210.30,210.09,212.85,216.83,222.17,221.44,215.94,212.08,207.41,204.55,196.47];
var avgPricePerKWH = 211.08;

function goodPrice(price) {
	if (price>=avgPricePerKWH) {
		$("#priceStatus").addClass("highPrice");
		return "høj";
	}
	else {
		$("#priceStatus").addClass("lowPrice")
		return "lav";
	}
}
