//preloader

$(window).on('load', function () {
    $('body').show();
    $('.preloader').delay(500).fadeOut('slow');
});

$( function () {

    // scroll-to-ancor

    $('a[data-target^="anchor"]').bind('click.smoothscroll', function(){
        var target = $(this).attr('href'),
            bl_top = $(target).offset().top - 70;
        $('body, html').animate({scrollTop: bl_top}, 900);
        return false
    });

    // -----

    $(window).scroll(function () {

        // header-on-scroll

        if($(window).scrollTop()>70){
            $('.header-top').addClass('header-small');
        } else {
            $('.header-top').removeClass('header-small');}

        if($(window).scrollTop()+$(window).height()>=$(document).height()){
            $('.header-top').addClass('header-hide');
        } else {
            $('.header-top').removeClass('header-hide');}

        // paralax

        var st = $(this).scrollTop();

        $('.cars__paralax-img').css({
            "transform" : "translate(0%, -" + st /70 +"% "
        });
    });

    // slider

    $('.slider-banner').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        asNavFor: '.slider-car',
        autoplay: true,
        autoplaySpeed: 10000,
        responsive: [{
                breakpoint: 767,
                settings: {
                    autoplaySpeed: 4000
                }
            }]
    });
    $('.slider-car').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-banner',
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: false,
        autoplaySpeed: 4000,
        appendArrows: '.hero__ars',
        prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous"><span class="top-slider-arrow-prev"><img class="arrow-prev-big-img" src="img/arrow-left-big.png"><img class="arrow-prev-small-img" src="img/arrow-left-sm.png"></span></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next"><span class="top-slider-arrow-next"><img class="arrow-next-big-img" src="img/arrow-right-big.png"><img class="arrow-next-small-img" src="img/arrow-right-sm.png"></span></button>'

    });

    // reqs-animation

    sliderSuper('.reqs__item', {
        timerShowFirst: 3000,
        timerShowTwo: 3000,
        timerHide: 3000,
        timerLoop: 15000
    });

    // mask

    $('input[name*="phone"]').inputmask({
        mask: '+7(999)999-99-99',
        showMaskOnHover: false
    });

    // header-dropdown

    $('.header__menu-btn-hidden-block, .header-menu-hidden__item, .header-menu-hidden__request').click( function () {
        $('.header__menu-btn-hidden-block').toggleClass('active');
        $('.header__menu-btn-hidden').toggleClass('active');
        $('.header-menu-hidden').toggleClass('active');
    });

    // popup

    $('.js-popup-link').on('click', function (e) {
        e.preventDefault();
        $.magnificPopup.open({
            items: {
                src: '#modal'
            }
        });
    });

    // send-form

    var validatePhone = function(phone) {
        var re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{3,10}$/;
        return re.test(phone);
    };

    $('.callback-form').submit(function(e){

        var phone = $('.callback-input').val(),
            errorFlag1 = false,
            data = $(this).serializeArray();

        e.preventDefault();

        if ( !validatePhone(phone) || phone == '' ) {
            $(this).find('input[name="phone"]').closest('.callback-input').addClass('error');
            errorFlag1 = true;
        } else{
            $(this).find('input[name="phone"]').closest('.callback-input').removeClass('error');
            errorFlag1 = false;
        }

        if ( !errorFlag1 ) {
            $.ajax({
                url: "/",
                type: "post",
                dataType: "json",
                data: data,

                success: function (ans) {
                    $('.callback-form')[0].reset();

                    $.magnificPopup.open({
                        items: {
                            src: '#success'
                        }
                    });
                }
            });
        }
    });
});



























