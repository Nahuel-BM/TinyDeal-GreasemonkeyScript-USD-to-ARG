// ==UserScript==
// @name        Tiny_Deal_Price_Peso_Argentina
// @namespace   nahuel.bustamante@gmail.com
// @include     http://www.tinydeal.com/*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==




var Price_USD_Venta;


$(document).ready(function() {

    Get_Current_Exchange_Rate();

    setInterval(function() {
        clear_ads();
        Change_USD_ARG();
    }, 1000);

});



function Change_USD_ARG() {

    $('.productSpecialPrice').each(function() {

        setValue(this);

    });

    $('.p_box_price').each(function() {

        setValue(this);

    });

}

function clear_ads() {

    $('.ad').each(function() {
        $(this).html(" ");
    });


}

function setValue(valor) {

    var priceUSD;
    var priceARG;
    var dataPrice = $(valor).html();

    var n = dataPrice.indexOf("ARG");


    if (dataPrice.includes("ARG ") == false) {

        var dataHtml = dataPrice.replace(/[^a-zA-Z 0-9.]+/g, ' ');

        priceUSD = parseFloat(dataHtml);
        priceARG = Number((priceUSD * Price_USD_Venta).toFixed(2));;

       // console.log("USD: " + priceUSD + "  ARG: " + priceARG + "  EXCHG:" + Price_USD_Venta);

        $(valor).html("ARG $" + priceARG);
    }


}

function Get_Current_Exchange_Rate() {

    $.ajaxSetup({
        async: false
    });

    $.getJSON('http://ws.geeklab.com.ar/dolar/get-dolar-json.php', function(data) {
        setExchangeRate(data);
    });

}



function setExchangeRate(textjson) {
    Price_USD_Venta = parseFloat(textjson.libre)
}
