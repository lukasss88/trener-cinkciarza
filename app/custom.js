

$(document).ready(function () {

    var plnToUsd = 0;
    var plnToEur = 0;
    var plnToGbp = 0;

    var usdToPln = 0;
    var eurToPln = 0;
    var gbpToPln = 0;



    /*=======================================
     AJAX REQUEST SCRIPTS
     ==================================================*/
    $(function() {
        $.ajax({
            type: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json',
            success: function(data) {
                console.log('success', data);
                plnToUsd = data.rates[0].ask;
                $('#plnToUsd').text(plnToUsd);
                usdToPln = data.rates[0].bid;
                $('#usdToPln').text(usdToPln);
            }
        });
        $.ajax({
            type: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/rates/c/eur/today/?format=json',
            success: function(data) {
                plnToEur = data.rates[0].ask;
                $('#plnToEur').text(plnToEur);
                eurToPln = data.rates[0].bid;
                $('#eurToPln').text(eurToPln);
            }
        });
        $.ajax({
            type: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/rates/c/gbp/today/?format=json',
            success: function(data) {
                plnToGbp = data.rates[0].ask;
                $('#plnToGbp').text(plnToGbp);
                gbpToPln = data.rates[0].bid;
                $('#gbpToPln').text(gbpToPln);

            }
        });


    });




    /*=======================================
     USD BUTTONS SCRIPTS
     ==================================================*/

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


    /*=======================================
     EURO BUTTONS SCRIPTS
     ==================================================*/
    $('.btn-sell-eur').on('click', function (event) {
        event.preventDefault();
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


    /*=======================================
     GBP BUTTONS SCRIPTS
     ==================================================*/
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


    /*=======================================
     RESET BUTTON SCRIPTS
     ==================================================*/
    $(':reset').on('click', function (){
        $('.btn-buy-usd').attr("disabled", true);
        $('.btn-buy-eur').attr("disabled", true);
        $('.btn-buy-gbp').attr("disabled", true);
        $('.btn-sell-gbp').removeAttr("disabled");
        $('.btn-sell-usd').removeAttr("disabled");
        $('.btn-sell-eur').removeAttr("disabled");

        $('#pln').removeClass('pln-icon-show');
        $('#dollar').removeClass('dollar-icon-show');
        $('#euro').removeClass('euro-icon-show');
        $('#pound').removeClass('pound-icon-show');
    })

});
