
$("#cost-btn").click(function(e){
    calcCost();
    e.preventDefault();
});

$("#position-btn").click(function (e) {
    calcLotSize();
    e.preventDefault();
});

$("#rca-btn").click(function (e) {
    rca();
    e.preventDefault();
});

var tradingRadioId = "tradingTypeRadio1";

function calcCost(){

    $('input:radio[name=tradingRadio]').on("change", function () {
        tradingRadioId = $(this).attr("id");
    });

    var costBuyPrice = $("#costBuyPrice").val();
    var costSellPrice = $("#costSellPrice").val();
    var costQuantity = $("#costQuantity").val();

    var netAmount = ((costBuyPrice * costQuantity)* 1.0112).toFixed(2);
    var avgPrice = (netAmount/costQuantity).toFixed(2);

    var netAmountSell = 0;
    var avgPriceSell = 0;
    var netProfitPL = 0;
    var avgProfitPer = 0;

    if (tradingRadioId === "tradingTypeRadio1"){
        netAmountSell = ((costSellPrice * costQuantity)* 0.9888).toFixed(2);
        avgPriceSell = (netAmountSell/costQuantity).toFixed(2);
        netProfitPL = (netAmountSell - netAmount).toFixed(2);
        avgProfitPer = (avgPriceSell - avgPrice).toFixed(2);

    } else if (tradingRadioId === "tradingTypeRadio2"){
        netAmountSell = ((costSellPrice * costQuantity)* 0.997).toFixed(2);
        avgPriceSell = (netAmountSell/costQuantity).toFixed(2);
        netProfitPL = (netAmountSell - netAmount).toFixed(2);
        avgProfitPer = (avgPriceSell - avgPrice).toFixed(2);
    }

    $("#netAmountSell").text("Sell - Net Amount = Rs. " + netAmountSell);
    $("#avgPriceSell").text("Average Price per Share = Rs. " + avgPriceSell);
    $("#netProfitPL").text("Net Profit/Loss = Rs. " + netProfitPL);
    $("#avgProfitPer").text("Average Profit/Loss per share = Rs. "+ avgProfitPer);
    $("#netAmount").text("Buy - Net Amount = Rs. " + netAmount);
    $("#avgPrice").text("Average Price per Share = Rs. " + avgPrice);
        
}

function calcLotSize(){
    
    var accountBalance = $("#accountBalance").val();
    var allocationPer = $("#allocationPer").val();
    var positionBuyPrice = $("#positionBuyPrice").val();
    var positionStopPrice = $("#positionStopPrice").val();
    var riskReward = $("#riskReward").val();

    var BPriceCom = positionBuyPrice * 1.0112;
    var STPriceCom = positionStopPrice * 0.9888;
    var RRV = (BPriceCom - STPriceCom) * riskReward;
    var sellPriceCom = ((BPriceCom + RRV)).toFixed(2);

    var lotSize = ((accountBalance*(allocationPer/100))/(BPriceCom)).toFixed(2);
    var positionSize = (lotSize*BPriceCom).toFixed(2);

    var riskedPS = (BPriceCom-STPriceCom).toFixed(2);

    var profitPT = ((lotSize*sellPriceCom) - (lotSize*BPriceCom)).toFixed(2);

    var lossPT = ((lotSize*BPriceCom) - (lotSize*STPriceCom)).toFixed(2);


    $("#lotSellValue").text("Sell Price = Rs. "+ sellPriceCom);
    $("#lotSize").text("Max # Shares To Buy (Lot Size) = "+ lotSize);
    $("#lotAmountPer").text("Amount Per Trade (Position Size) = " + positionSize);
    $("#lotRiskedPer").text("Risked Per Share = Rs. "+ riskedPS);
    $("#lotMaxProfit").text("Max Profit Per Trade = Rs. "+ profitPT);
    $("#lotMaxLoss").text("Max Loss Per Trade = Rs. "+ lossPT);
}

function rca(){
    
    var rcaRupeeAmount = $("#rcaRupeeAmount").val();
    var rcaBuyPrice = $("#rcaBuyPrice").val();
    
    var priceCost = (rcaBuyPrice * 1.0112).toFixed(2);
    var rcaQuantity = (rcaRupeeAmount / priceCost).toFixed(2);

    $("#rcaPriceCost").text("Price + Cost = Rs. "+ priceCost);
    $("#rcaQuantity").text("Buying Quantity = " + rcaQuantity);
}
