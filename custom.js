

$(document).ready(function () {

    var plnToUsd = 0;
    var plnToEur = 0;
    var plnToGbp = 0;

    var usdToPln = 0;
    var eurToPln = 0;
    var gbpToPln = 0;

    var numTransaction = 0;

    /*=======================================
     AJAX REQUEST SCRIPTS
     ==================================================*/
    $(function() {
        $.ajax({
            type: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json',
            success: function(data) {
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
        numTransaction++;

        if( $('#summary-number').val() ) {
            var value1 = summaryValue / plnToUsd;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            localStorage.setItem('Zamieniono złotówki na dolary',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + (value1 * plnToUsd).toFixed(2) + 'PLN za ' + ($('#summary-number').val()) + '$</p>');
        }
        else {
            var value2 = startValue / plnToUsd;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono złotówki na dolary',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + ($('#start-number-input').val()) + 'PLN za ' + ($('#summary-number').val()) + '$</p>');
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
        numTransaction++;

        if( $('#summary-number').val() ) {
            var value1 = summaryValue * usdToPln;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            localStorage.setItem('Zamieniono dolary na złotówki',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Kupiono ' + ($('#summary-number').val()) + 'PLN za ' + (value1 / usdToPln).toFixed(2)  + '$</p>');
        }
        else {
            var value2 = startValue * usdToPln;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono dolary na złotówki',JSON.stringify($('#summary-number').val()));
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
        numTransaction++;

        if( $('#summary-number').val() ) {
            var value1 = summaryValue / plnToEur;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            localStorage.setItem('Zamieniono złotówki na euro',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + (value1 * plnToEur).toFixed(2) + 'PLN za ' + ($('#summary-number').val()) + '€</p>');
        }
        else {
            var value2 = startValue / plnToEur;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono złotówki na euro',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + ($('#start-number-input').val()) + 'PLN za ' + ($('#summary-number').val()) + '€</p>');
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
        numTransaction++;

        if( $('#summary-number').val() ) {
            var value1 = summaryValue * eurToPln;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            localStorage.setItem('Zamieniono euro na złotówki',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Kupiono ' + ($('#summary-number').val()) + 'PLN za ' + (value1 / eurToPln).toFixed(2) + '€</p>');
        }
        else {
            var value2 = startValue * eurToPln;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono euro na złotówki',JSON.stringify($('#summary-number').val()));
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
        numTransaction++;

        if( $('#summary-number').val() ) {
            var value1 = summaryValue / plnToGbp;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            localStorage.setItem('Zamieniono złotówki na funty',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + (value1 * plnToGbp).toFixed(2) + 'PLN za ' + ($('#summary-number').val()) + '£</p>');
        }
        else {
            var value2 = startValue / plnToGbp;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono złotówki na funty',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + ($('#start-number-input').val()) + 'PLN za ' + ($('#summary-number').val()) + '£</p>');
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
        numTransaction++;

        if( $('#summary-number').val() ) {
            var value1 = summaryValue * gbpToPln;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            localStorage.setItem('Zamieniono funty na złotówki',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Kupiono ' + ($('#summary-number').val()) + 'PLN za ' + (value1 / gbpToPln).toFixed(2) + '£</p>');
        }
        else {
            var value2 = startValue * gbpToPln;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono funty na złotówki',JSON.stringify($('#summary-number').val()));
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

        $('.transaction').empty();
        numTransaction = 0;
    });

    $("#start-number-input").on("change", function(){
        $('.reset').addClass('ui-btn-active');
    });

});
