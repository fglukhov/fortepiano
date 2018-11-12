var isIE9OrBelow = function() {
  return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}

var numFormat = wNumb({
  thousand: ' '
});

$(window).scroll(function () {

  var scrollPos = $(window).scrollTop();

  if (scrollPos > $(".page-header").offset().top) {

    $("header").css({
      paddingTop: $(".header-content").outerHeight()
    }).addClass("header-fixed");

  } else {
    $("header").css({
      paddingTop: 0
    }).removeClass("header-fixed");
  }

});

$(window).resize(function () {



});

$(window).on("load", function () {



});

$(document).ready(function () {

  // Events slider

  $(".events-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1
  });

  // Actions slider

  $(".actions-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Maps

  google.maps.event.addDomListener(window, 'load', function () {

    if ($("#footerContactsMap").length) {

      initFooterMap();

    }

  });

  // Form reset

  $("body").on("click", ".form-reset", function () {

    $(this).closest("form")[0].reset();

    if ($(this).closest("form").find(".picker__input").length) {

      $(this).closest("form").find(".picker__input").data( 'pickadate' ).clear();

    }

    $(this).closest(":checked").attr("checked",false);

    $(this).closest("form").find("select").each(function () {

      $(this).val($(this).find("option:first-child").attr("value")).change();

    });

    return false;

  });

  // Mobile
  
  // Main menu

  $(".menu-trigger").click(function () {

    $(".header-menu").fadeToggle(150);
    $(this).toggleClass("active");

  });

  $(".header-menu .close").click(function () {

    $(".header-menu").fadeOut(150);

  });

  $(".header-menu").click(function (e) {

    if (!$(e.target).hasClass("header-menu-inner") && !$(e.target).parents().hasClass("header-menu-inner")) {

      $(".header-menu").fadeOut(150);

    }

  });

  // Mobile END

  // Intext video

  $(".intext-video").click(function () {

    var thisHeight = $(this).height();

    $(this).addClass("active").html('<iframe width="100%" height="' + thisHeight + '" src="' + $(this).data("url") +  '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');

  });


  // Expandable

  $(".expandable-trigger").click(function () {

    var exTrigger = $(this),
        exWrapper = $(this).closest(".expandable"),
        exContent = $(this).closest(".expandable").find(".expandable-content");

    if (!$(this).hasClass("active")) {

      exContent.slideDown(350, function () {
        exTrigger.addClass("active");
        exWrapper.addClass("open");
      });

    } else {
      exContent.slideUp(350, function () {
        exTrigger.removeClass("active");
        exWrapper.removeClass("open");
      });
    }

  });

  $(".input-date").each(function () {

    var pickerField = $(this);

    pickerField.pickadate({
      monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      format: 'd.mm.yyyy',
      min: new Date(),
      selectYears: true,
      selectMonths: true,
      onSet: function () {
        pickerField.closest(".form-group").find(".placeholder").hide()
      }
    });

  });

  $(".input-time").each(function () {

    var pickerField = $(this);

    pickerField.pickatime({
      format: 'HH:i',
      onSet: function () {
        pickerField.closest(".form-group").find(".placeholder").hide()
      }
    });

  });

  $("input[type=file]").fileinput({
    rtl: false,
    showUpload: false,
    showPreview: true,
    showCancel: false,
    browseLabel: "Выбрать фото",
    msgPlaceholder: "",
    dropZoneEnabled: false,
    mainClass: "input-group-lg"
  });

  // Numeric input

  $(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
  });


  // Fancybox

  $("a.fancybox").fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  // Forms

  $("select").not(".picker__select--month, .picker__select--year").each(function () {
    if ($(this).attr("multiple")) {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор",
        selectedTextFormat: "count",
        countSelectedText: function(count) {
          return count + " " + declOfNum(count, ['элемент', 'элемента', 'элементов']);
        }
      });
    } else {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор"
      });
    }
  });

  $('.input-numeric').bind('keyup paste', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  if ($("input:text").length) {
    $("input:text").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  if ($("textarea").length) {
    $("textarea").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  $("body").on("focus input","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      placeholder.hide();

    }

  });

  $("body").on("blur","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
        placeholder.show();
      }

    }

  });

  $("body").on("click",".placeholder",function(e) {
    if ($(this).parent().find("input").length) {
      $(this).parent().find("input").trigger("focus");
    }
    if ($(this).parent().find("textarea").length) {
      $(this).parent().find("textarea").trigger("focus");
    }
  })

  $("input.input-phone").mask("+7 (999) 999-99-99");

  $("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-group").addClass("focus");
  });

  $("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-group").removeClass("focus")
  });

  validateForms();

});

function validateForms() {

  jQuery.validator.addClassRules('phone-email-group', {
    require_from_group: [1, ".phone-email-group"]
  });

  $("select").on("change", function () {
    if (!$(this).closest(".picker").length && !$(this).closest(".form-lister-wrapper").length) {
      $(this).valid();
    }
  });

  $("body").on("click", ".form-group", function (e) {
    if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
      $(e.target).closest(".form-group").find("select").selectpicker('toggle');
    }
  });

  $("form").each(function() {

    form = $(this);

    $(this).validate({
      focusInvalid: true,
      sendForm : false,
      errorPlacement: function(error, element) {
        element.closest(".form-group").addClass("error");
        if (element[0].tagName == "SELECT") {
          element.closest(".btn-group").addClass("btn-group-error");
          if (element.closest(".form-group").length) {
            error.insertAfter(element.closest(".form-group"));
          } else {
            error.insertAfter(element.closest(".btn-group"));
          }
        } else {
          if (element.attr("type") == "checkbox") {
            element.siblings("label").addClass("checkbox-label-error")
          } else {
            error.insertAfter(element);
          }
        }

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
        $(element).closest(".form-group").removeClass("error").addClass("valid");

        if ($(element)[0].tagName == "SELECT") {
          $(element).closest(".btn-group").removeClass("btn-group-error");
          if ($(element).closest(".form-group").length) {
            error.insertAfter(element.closest(".form-group"));
            $(element).closest(".form-group").next("label.error").remove();
          } else {
            $(element).closest(".btn-group").next("label.error").remove();
          }
        } else {
          $(element).next(".error").remove();
          if ($(element).attr("type") == "checkbox") {
            $(element).siblings("label").removeClass("checkbox-label-error")
          }
        }
      },
      invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
          validatorcalc.errorList[0].element.focus();
        }
      }
    });

    if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
      $(this).find("input.password-repeat").rules('add', {
        equalTo: "#"+form.find("input.password").attr("id")
      });
    }

  });

}

jQuery.extend(jQuery.validator.messages, {
  required: "Не заполнено поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function parallax(obj, objOffset, speed) {

  var objPos = - $(window).scrollTop() + obj.closest(".parallax-wrapper").offset().top + objOffset

  obj.css({
    transform: "translateY(" + objPos + "px)"
  });

}

function slickResponsive() {

  if ($("#mobile-indicator").css("display") == "block") {

    $(".docs-list .tr").slick({
      slidesToShow: 2,
      slidesToScroll: 2
    });

  } else {

    if ($(".docs-list .tr").hasClass("slick-initialized")) {
      $(".docs-list .tr").slick("unslick");
    }

  }

}

function readURL(input, img) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      img.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function initFooterMap() {

  var myLatLng = {lat: 55.767321, lng: 37.607748};

  var myCenter = {lat: 55.767321, lng: 37.605248};

  var map = new google.maps.Map(document.getElementById('footerContactsMap'), {
    zoom: 17,
    center: myCenter

  });

  if ($("#mobile-indicator").css("display") == "block") {
    map.setCenter({lat: 55.767321, lng: 37.607748});
  } else {
    map.setCenter({lat: 55.767321, lng: 37.605248});
  }

  var contactsMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: 'images/map-pin.png'
  });

  google.maps.event.addDomListener(window, "load resize", function() {
    if ($("#mobile-indicator").css("display") == "block") {
      map.setCenter({lat: 55.767321, lng: 37.607748});
    } else {
      map.setCenter({lat: 55.767321, lng: 37.605248});
    }

    if ($("#mobile-indicator").css("display") == "block") {

      infowindow.setOptions({
        maxWidth: 280
      })

    }

  });

  $(window).resize(function () {

    if ($("#mobile-indicator").css("display") == "block") {
      map.setCenter({lat: 55.767321, lng: 37.607748});
    } else {
      map.setCenter({lat: 55.767321, lng: 37.605248});
    }

    if ($("#mobile-indicator").css("display") == "block") {

      infowindow.setOptions({
        maxWidth: 280
      })

    }

  });


}

