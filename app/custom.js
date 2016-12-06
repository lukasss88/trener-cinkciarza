

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
        numTransaction++;

        if( $('#summary-number').val() ) {
            $('#summary-number').val(summaryValue / plnToUsd);
            var data = JSON.parse(localStorage.getItem("todoData"));
            localStorage.setItem('Zamieniono złotówki na dolary',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + ($('#summary-number').val()) + 'PLN za ' + ($('#summary-number').val()) + '$</p>');
        }
        else {
            $('#summary-number').val(startValue / plnToUsd);
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
            $('#summary-number').val(summaryValue * usdToPln);
            localStorage.setItem('Zamieniono dolary na złotówki',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Kupiono ' + ($('#summary-number').val()) + '$ za ' + ($('#summary-number').val()) + 'PLN</p>');
        }
        else {
            $('#summary-number').val(startValue * usdToPln);
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
            $('#summary-number').val(summaryValue / plnToEur);
            localStorage.setItem('Zamieniono złotówki na euro',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + ($('#summary-number').val()) + 'PLN za ' + ($('#summary-number').val()) + '€</p>');
        }
        else {
            $('#summary-number').val(startValue / plnToEur);
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
            $('#summary-number').val(summaryValue * eurToPln);
            localStorage.setItem('Zamieniono euro na złotówki',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Kupiono ' + ($('#summary-number').val()) + '€ za ' + ($('#summary-number').val()) + 'PLN</p>');
        }
        else {
            $('#summary-number').val(startValue * eurToPln);
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
            $('#summary-number').val(summaryValue / plnToGbp);
            localStorage.setItem('Zamieniono złotówki na funty',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Sprzedano ' + ($('#summary-number').val()) + 'PLN za ' + ($('#summary-number').val()) + '£</p>');
        }
        else {
            $('#summary-number').val(startValue / plnToGbp);
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
            $('#summary-number').val(summaryValue * gbpToPln);
            localStorage.setItem('Zamieniono funty na złotówki',JSON.stringify($('#summary-number').val()));
            $('.transaction').append('<p>'+numTransaction + '. Kupiono ' + ($('#summary-number').val()) + '£ za ' + ($('#summary-number').val()) + 'PLN</p>');
        }
        else {
            $('#summary-number').val(startValue * gbpToPln);
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
