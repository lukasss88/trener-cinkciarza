$(document).ready(function ()
{

    var numTransaction = 0;
    var sellCurrency = 0;
    var buyCurrency = 0;
    var activeIcon;

    var iconCurrency = {
        usd: '$', eur: '€' , gbp: '£'
    };

    $.ajax({
        type: 'GET', url: 'http://api.nbp.pl/api/exchangerates/tables/c/today/', succes: function (data)
        {
            $('.table-currency').html(data)
        }
    });


    $('#select-currency').change(function ()
    {
        var currency = $("#select-currency option:selected").text();
        console.log($("#select-currency option:selected").text());
        activeIcon = iconCurrency[currency];
        console.log(activeIcon);

        $.ajax({
            type: 'GET', url: 'http://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json', success: function (data)
            {
                sellCurrency = data.rates[0].ask;
                buyCurrency = data.rates[0].bid;
            }
        });
    });



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
                    '<p>' + numTransaction + '. Sprzedano ' + (value1 * sellCurrency).toFixed(2) + 'PLN za ' + ($('#summary-number').val()) + activeIcon + '</p>');
        } else {
            var value2 = startValue / sellCurrency;
            value2 = value2.toFixed(2);
            $('#summary-number').val(value2);
            localStorage.setItem('Zamieniono złotówki na ' + $("#select-currency option:selected").text(), JSON.stringify($('#summary-number').val()));
            $('.transaction').append(
                    '<p>' + numTransaction + '. Sprzedano ' + ($('#start-number-input').val()) + 'PLN za ' + ($('#summary-number').val()) + activeIcon + '</p>');
        }
        console.log(sellCurrency);
        $('.btn-sell').attr("disabled", true);
        $('.btn-buy').removeAttr("disabled");
    });


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
        console.log(buyCurrency);
        $('.btn-buy').attr("disabled", true);
        $('.btn-sell').removeAttr("disabled");
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


    $(function ()
    {
        $('#select-currency').change(function ()
        {
            $('.currency-state').hide();
            $('#' + $(this).val()).show();
        });
    });
});



