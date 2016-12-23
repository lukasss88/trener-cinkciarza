$(document).ready(function () {

    var numTransaction = 0;

    var sellCurrency = 0;
    var buyCurrency = 0;

    $('#select-currency').change(function() {
        var currency = $( "#select-currency option:selected" ).text();
        console.log($( "#select-currency option:selected" ).text());

        $.ajax({
            type: 'GET', url: 'http://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json', success: function (data)
            {
                sellCurrency = data.rates[0].ask;
                buyCurrency = data.rates[0].bid;
            }
        });
    });

    $('.btn-sell').on('click', function () {

                event.preventDefault();
                var startValue = +$('#start-number-input').val();
                var summaryValue = +$('#summary-number').val();
                numTransaction++;

                if ($('#summary-number').val()) {
                    var value1 = summaryValue / sellCurrency;
                    value1 = value1.toFixed(2);
                    $('#summary-number').val(value1);
                    // localStorage.setItem('Zamieniono złotówki na dolary', JSON.stringify($('#summary-number').val()));
                    // $('.transaction').append(
                    //         '<p>' + numTransaction + '. Sprzedano ' + (value1 * sellCurrency).toFixed(2) + 'PLN za ' + ($('#summary-number').val()) + '$</p>');
                } else {
                    var value2 = startValue / sellCurrency;
                    value2 = value2.toFixed(2);
                    $('#summary-number').val(value2);
                    // localStorage.setItem('Zamieniono złotówki na dolary', JSON.stringify($('#summary-number').val()));
                    // $('.transaction').append(
                    //         '<p>' + numTransaction + '. Sprzedano ' + ($('#start-number-input').val()) + 'PLN za ' + ($('#summary-number').val()) + '$</p>');
                }
                console.log(sellCurrency);
                // $('.btn-sell').attr("disabled", true);
                // // $('.btn-sell-usd').attr("disabled", true);
                // // $('.btn-sell-eur').attr("disabled", true);
                // // $('.btn-sell-gbp').attr("disabled", true);
                // $('.btn-buy-usd').removeAttr("disabled");
                // $('#pln').removeClass('pln-icon-show');
                // $('#dollar').addClass('dollar-icon-show');
    });


    $('.btn-buy').on('click', function () {

        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();
        numTransaction++;

        if( $('#summary-number').val() ) {
            var value1 = summaryValue * buyCurrency;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            // localStorage.setItem('Zamieniono dolary na złotówki',JSON.stringify($('#summary-number').val()));
            // $('.transaction').append('<p>'+numTransaction + '. Kupiono ' + ($('#summary-number').val()) + 'PLN za ' + (value1 / buyCurrency).toFixed(2)  + '$</p>');
        }
        else {
            var value2 = startValue * buyCurrency;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            // localStorage.setItem('Zamieniono dolary na złotówki',JSON.stringify($('#summary-number').val()));
        }
        console.log(buyCurrency);
        // $('.btn-buy-usd').attr("disabled", true);
        // $('.btn-sell-usd').removeAttr("disabled");
        // $('.btn-sell-eur').removeAttr("disabled");
        // $('.btn-sell-gbp').removeAttr("disabled");
        // $('#dollar').removeClass('dollar-icon-show');
        // $('#pln').addClass('pln-icon-show');
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


    $(function() {
        $('#select-currency').change(function(){
            $('.currency-state').hide();
            $('#' + $(this).val()).show();
        });
    });

});



