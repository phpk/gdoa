function showMsg(text) {
    var show = $('.show_msg').length
    if (show > 0) {

    } else {
        var div = $('<div></div>');
        div.addClass('show_msg');
        var span = $('<span></span>');
        span.addClass('show_span');
        span.appendTo(div);
        span.text(text);
        $('body').append(div);
    }
    $(".show_span").text(text);
    $(".show_msg").css('top', '');
    $(".show_msg").css('bottom', '50%');
    $('.show_msg').hide();
    $('.show_msg').fadeIn(1000);
    $('.show_msg').fadeOut(1000);
}