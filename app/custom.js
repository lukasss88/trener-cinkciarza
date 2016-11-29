$( document ).ready(function() {
    var startValue = +$('#start-number-input').val();
    var usd = 3.3;
    $('btn-buy-usd').on('click', function() {
        $('#start-number-input').text(startValue * usd);
    })
});
