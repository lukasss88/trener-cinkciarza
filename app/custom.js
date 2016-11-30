

$(document).ready(function () {

    var plnToUsd = 4.1854;
    var plnToEur = 4.4464;
    var plnToGbp = 5.2196;

    var usdToPln = 4.1707;
    var eurToPln = 4.4302;
    var gbpToPln = 5.2041;



    $('.btn-sell-usd').on('click', function (event) {
        event.preventDefault();
        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();

        if( $('#summary-number').val() ) {
            $('#summary-number').val(summaryValue / plnToUsd);
        }
        else {
            $('#summary-number').val(startValue / plnToUsd);
        }




        $('.btn-sell-usd').attr("disabled", true);
        $('.btn-sell-eur').attr("disabled", true);
        $('.btn-sell-gbp').attr("disabled", true);
        $('.btn-buy-usd').removeAttr("disabled");
        $('#pln').removeClass('pln-icon-show');
        $('#dollar').addClass('dollar-icon-show');

    });
    $('.btn-buy-usd').on('click', function () {
        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();

        if( $('#summary-number').val() ) {
            $('#summary-number').val(summaryValue * usdToPln);
        }
        else {
            $('#summary-number').val(startValue * usdToPln);
        }

        $('.btn-buy-usd').attr("disabled", true);
        $('.btn-sell-usd').removeAttr("disabled");
        $('.btn-sell-eur').removeAttr("disabled");
        $('.btn-sell-gbp').removeAttr("disabled");
        $('#dollar').removeClass('dollar-icon-show');
        $('#pln').addClass('pln-icon-show');
    });


    $('.btn-sell-eur').on('click', function () {
        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();

        if( $('#summary-number').val() ) {
            $('#summary-number').val(summaryValue / plnToEur);
        }
        else {
            $('#summary-number').val(startValue / plnToEur);
        }

        $('.btn-sell-eur').attr("disabled", true);
        $('.btn-sell-usd').attr("disabled", true);
        $('.btn-sell-gbp').attr("disabled", true);
        $('.btn-buy-eur').removeAttr("disabled");
        $('#pln').removeClass('pln-icon-show');
        $('#euro').addClass('euro-icon-show');
    });
    $('.btn-buy-eur').on('click', function () {
        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();

        if( $('#summary-number').val() ) {
            $('#summary-number').val(summaryValue * eurToPln);
        }
        else {
            $('#summary-number').val(startValue * eurToPln);
        }


        $('.btn-buy-eur').attr("disabled", true);
        $('.btn-sell-eur').removeAttr("disabled");
        $('.btn-sell-usd').removeAttr("disabled");
        $('.btn-sell-gbp').removeAttr("disabled");
        $('#euro').removeClass('euro-icon-show');
        $('#pln').addClass('pln-icon-show');
    });



    $('.btn-sell-gbp').on('click', function () {
        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();

        if( $('#summary-number').val() ) {
            $('#summary-number').val(summaryValue / plnToGbp);
        }
        else {
            $('#summary-number').val(startValue / plnToGbp);
        }

        $('.btn-sell-gbp').attr("disabled", true);
        $('.btn-sell-usd').attr("disabled", true);
        $('.btn-sell-eur').attr("disabled", true);
        $('.btn-buy-gbp').removeAttr("disabled");
        $('#pln').removeClass('pln-icon-show');
        $('#pound').addClass('pound-icon-show');
    });
    $('.btn-buy-gbp').on('click', function () {
        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();

        if( $('#summary-number').val() ) {
            $('#summary-number').val(summaryValue * gbpToPln);
        }
        else {
            $('#summary-number').val(startValue * gbpToPln);
        }



        $('.btn-buy-gbp').attr("disabled", true);
        $('.btn-sell-gbp').removeAttr("disabled");
        $('.btn-sell-usd').removeAttr("disabled");
        $('.btn-sell-eur').removeAttr("disabled");
        $('#pound').removeClass('pound-icon-show');
        $('#pln').addClass('pln-icon-show');
    });



});
