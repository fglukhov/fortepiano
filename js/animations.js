var is_mobile = false;

if( $('#mobile-indicator').css('display') == 'block') {
  is_mobile = true;
}

if (!is_mobile) {

  var controller = new ScrollMagic.Controller();

  $.each( $(".events-slider"), function( index, element ) {

    var eventsSliderTween = new TweenMax.to($(element), .5, {
      y: 0,
      opacity: 1
    });

    var sceneEventsSlider = new ScrollMagic.Scene({triggerElement: element})
      .offset(-100)
      .setTween(eventsSliderTween)
      .addTo(controller)

  });

  $.each( $(".actions-slider"), function( index, element ) {

    var actionsSliderTween = new TweenMax.to($(element), .5, {
      y: 0,
      opacity: 1
    });

    var sceneactionsSlider = new ScrollMagic.Scene({triggerElement: element})
      .offset(-100)
      .setTween(actionsSliderTween)
      .addTo(controller)

  });

  $.each( $(".credit-pros-list .tmb"), function( index, element ) {

    var creditProsTmbTween = new TweenMax.to($(element), .6, {
      scale: 1,
      opacity: 1,
      delay: $(this).closest(".col-xs-4").prevAll().length*.2
    });

    var sceneCreditPros = new ScrollMagic.Scene({triggerElement: element})
      .offset(-250)
      .setTween(creditProsTmbTween)
      .addTo(controller);

  });

  $.each( $(".calc-slider-wrapper"), function( index, element ) {

    var calcSliderTween = new TweenMax.to($(element), .5, {
      x: 0,
      opacity: 1,
      delay: $(this).closest(".col-xs-12").prevAll().length*.35
    });

    var sceneCalcSlider = new ScrollMagic.Scene({triggerElement: element})
      .offset(-300)
      .setTween(calcSliderTween)
      .addTo(controller);

  });

  $.each( $(".company-pros-item"), function( index, element ) {

    var companyProsTween = new TweenMax.to($(element), .5, {
      x: 0,
      opacity: 1,
      delay: $(this).closest(".col-xs-12").prevAll().length*.35
    });

    var sceneCompanyPros = new ScrollMagic.Scene({triggerElement: element})
      .offset(-300)
      .setTween(companyProsTween)
      .addTo(controller);

  });

  $.each( $(".work-list .tmb-pic"), function( index, element ) {

    var workPicTween = new TweenMax.to($(element), .5, {
      rotationY: 0,
      opacity: 1,
      delay: $(this).closest(".col-xs-12").prevAll().length * .35
    });

    var sceneWorkPic = new ScrollMagic.Scene({triggerElement: element.closest(".work-list")})
      .offset(-300)
      .setTween(workPicTween)
      .addTo(controller);

  });

  $.each( $(".work-list .tmb-descr"), function( index, element ) {

    var workTextTween = new TweenMax.to($(element), .5, {
      scale: 1,
      opacity: 1,
      delay: $(this).closest(".col-xs-12").prevAll().length*.35 + .5
    });

    var sceneWorkText = new ScrollMagic.Scene({triggerElement: element.closest(".work-list")})
      .offset(-300)
      .setTween(workTextTween)
      .addTo(controller);

  });

  $.each( $(".pros-list .tmb"), function( index, element ) {

    var prosTween = new TweenMax.to($(element), .5, {
      rotationY: 0,
      opacity: 1,
      delay: $(this).closest(".col-xs-6").prevAll().length * .35
    });

    var scenePros = new ScrollMagic.Scene({triggerElement: element.closest(".pros-list")})
      .offset(-300)
      .setTween(prosTween)
      .addTo(controller);

  });

  $.each( $(".cert-list .fancybox"), function( index, element ) {

    var certTween = new TweenMax.to($(element), .5, {
      scale: 1,
      opacity: 1,
      delay: $(this).closest(".col-xs-6").prevAll().length * .35
    });

    var sceneCert = new ScrollMagic.Scene({triggerElement: element.closest(".cert-list")})
      .offset(-300)
      .setTween(certTween)
      .addTo(controller);

  });

  $.each( $(".clients-list"), function( index, element ) {

    var clientsTween = new TweenMax.to($(element), .5, {
      y: 1,
      opacity: 1
    });

    var sceneClients = new ScrollMagic.Scene({triggerElement: element})
      .offset(-400)
      .setTween(clientsTween)
      .addTo(controller);

  });

}