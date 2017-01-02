$(document).ready(function ()
{

    var numTransaction = 0;
    var sellCurrency = 0;
    var buyCurrency = 0;
    var activeIcon;
    var iconCurrency = {
        usd: '$', eur: '€', gbp: '£'
    };

    $('#select-currency').change(function ()
    {
        var currency = $("#select-currency option:selected").text();
        activeIcon = iconCurrency[currency];

        $.ajax({
            type: 'GET', url: 'http://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json', success: function (data)
            {
                var object1 = {};

                sellCurrency = data.rates[0].ask;
                buyCurrency = data.rates[0].bid;
            }
        });
    });

    /*=======================================
     SELL BUTTON SCRIPTS
     ==================================================*/
    $('.btn-sell').on('click', function ()
    {
        event.preventDefault();
        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();
        numTransaction++;

        if ($('#summary-number').val()) {
            var value1 = summaryValue / sellCurrency;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            localStorage.setItem('Zamieniono złotówki na ' + $("#select-currency option:selected").text(), JSON.stringify($('#summary-number').val()));
            $('.transaction').append(
                    '<p>' + numTransaction + '. Sprzedano ' + (value1 * sellCurrency).toFixed(2) + 'PLN za ' + ($('#summary-number').val()) + activeIcon
                    + '</p>');
        } else {
            var value2 = startValue / sellCurrency;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono złotówki na ' + $("#select-currency option:selected").text(), JSON.stringify($('#summary-number').val()));
            $('.transaction').append(
                    '<p>' + numTransaction + '. Sprzedano ' + ($('#start-number-input').val()) + 'PLN za ' + ($('#summary-number').val()) + activeIcon
                    + '</p>');
        }
        $('.btn-sell').attr("disabled", true);
        $('.btn-buy').removeAttr("disabled");
        $('#currency-icon').html('<span></span>').append('<span>' + activeIcon + '</span>')
    });

    /*=======================================
     BUY BUTTON SCRIPTS
     ==================================================*/
    $('.btn-buy').on('click', function ()
    {
        var startValue = +$('#start-number-input').val();
        var summaryValue = +$('#summary-number').val();
        numTransaction++;

        if ($('#summary-number').val()) {
            var value1 = summaryValue * buyCurrency;
            value1 = value1.toFixed(2);
            $('#summary-number').val(value1);
            localStorage.setItem('Zamieniono dolary na ' + $("#select-currency option:selected").text(), JSON.stringify($('#summary-number').val()));
            $('.transaction').append(
                    '<p>' + numTransaction + '. Kupiono ' + ($('#summary-number').val()) + 'PLN za ' + (value1 / buyCurrency).toFixed(2) + activeIcon + '</p>');
        } else {
            var value2 = startValue * buyCurrency;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono dolary na ' + $("#select-currency option:selected").text(), JSON.stringify($('#summary-number').val()));
        }
        $('.btn-buy').attr("disabled", true);
        $('.btn-sell').removeAttr("disabled");
        $('#currency-icon').html('<span></span>').append('<span>' + 'PLN' + '</span>')
    });

    /*=======================================
     RESET BUTTON SCRIPTS
     ==================================================*/
    $(':reset').on('click', function ()
    {
        $('.btn-buy').attr("disabled", true);
        $('.btn-sell').removeAttr("disabled");
        localStorage.clear();

        $('.transaction').empty();
        numTransaction = 0;
    });

    $("#start-number-input").on("change", function ()
    {
        $('.reset').addClass('ui-btn-active');
    });

    /*=======================================
     SHOW/HIDE CURRENCY-STATE BOX SCRIPTS
     ==================================================*/
    $(function ()
    {
        $('#select-currency').change(function ()
        {
            $('.currency-state').hide();
            $('#' + $(this).val()).show();
        });
    });

    /*=======================================
     TABLE OF CURRENCIES BOX SCRIPTS
     ==================================================*/
    var arrayCurrency = [];
    var currencyName;
    var numCurrency = 0;

    $.ajax({
        type: 'GET', url: 'http://api.nbp.pl/api/exchangerates/tables/c/?format=json', success: function (data)
        {
            arrayCurrency = data["0"].rates;
            for (var i = 0; i < arrayCurrency.length; i++) {
                $('.table-currency').append('<tr>' + '<td>' + arrayCurrency[numCurrency].code + '</td>' + '<td>' + arrayCurrency[numCurrency].ask + '</td>' + '<td>' + arrayCurrency[numCurrency].bid + '</td>')
                numCurrency++;
            }
        }
    });
});
