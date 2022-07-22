$(function () {

    $('.header__btn').on('click', function(){
        $('.rightside__menu').removeClass('rightside__menu--close');
    });
    $('.rightside__menu-close').on('click', function(){
        $('.rightside__menu').addClass('rightside__menu--close');
    });

    $('.header__btn-menu').on('click', function(){
        $('.menu').toggleClass('menu--open');
    });

    if($(window).width() < 651){
        $('.work__item-measurements').appendTo($('.work__items-box'));
    }

    $('.top__slider').slick({
        dots:true,
        arrows:false,
        centerMode:true,
        variableWidth: true 
        //autoplay: true
    });
    
    $('.contact__slider').slick({
        dots:true,
        arrows:false,
        slidesToShow: 10,
        slidesToScroll: 10,
        responsive: [
            {
              breakpoint: 1700,
              settings: {
                slidesToShow: 8,
                slidesToScroll: 8
              }
            },
            {
                breakpoint: 1511,
                settings: {
                  slidesToShow: 6,
                  slidesToScroll: 6
                }
              } 
              ,
              {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    adaptiveHeight: true
                  }
                },{
                    breakpoint: 840,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3
                    }
                  },{
                    breakpoint: 540,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1
                    }
                  },{
                    breakpoint: 415,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      centerMode: true,
                      dots: false,
                      centerPadding: '60px'
                    }
                  }

        ]
    });
    $('.article-slider').slick({
        dots:false,
        arrows:true,
        autoplay: true,
        prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrowLeft"><img src="images/s-left.svg" alt="ar-slide"></button>',
        nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrowRight"><img src="images/s-right.svg" alt="ar-slide"></button>'
    });

    const mixer = mixitup('.gallery__inner', {
        load: {
            filter: '.room'
        }
    });

})