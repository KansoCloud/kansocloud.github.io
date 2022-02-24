$(document).ready(function () {

    // Animation
  
    // Navbar Mobile
    $('.navbar-toggler').on('click', function () {
      $('.navbar-overlay').addClass('navbar-overlay-show');
      $('body').addClass('overflow-hidden');
    });
    $('.navbar-mobile-close, .navbar-overlay').on('click', function () {
      $('.navbar-collapse').removeClass('show');
      $('body').removeClass('overflow-hidden');
      window.setTimeout(function () {
        $('.navbar-overlay').removeClass('navbar-overlay-show');
      }, 40);
    });
  
    // Card Slider
    if ($('.ss-card-slider').length) {
      $('.ss-card-slider').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        items: 2,
        responsive: {
          0: {
            items: 1,
            nav: false,
            dots: true
          },
          768: {
            items: 2,
            nav: false,
            dots: true
          }
        }
      });
    }
  
    // Service Tab scroll sticky and top position
    if ($('.service-tablist').length) {
      serviceTabFunction();
    }
  
    // Service Tab links
    var hash = location.hash.replace(/^#/, '');
    $('.service-tablist a').on('shown.bs.tab', function (e) {
      window.location.hash = e.target.hash;
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 1);
    });
    var hash2 = document.location.hash;
    if (hash2) {
      setTimeout(() => {
        $('.service-tablist a[href="' + hash2 + '"]').tab('show');
      });
    }
  });
  
  
  $(window).resize(function () {
  
    // Service Tab scroll sticky and top position
    if ($('.service-tablist').length) {
      serviceTabFunction();
    }
  
  });
  
  // form validation
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })();
  
  // Service Tab scroll sticky and top position
  function serviceTabFunction() {
    var stickyOffset = $('.service-tablist').offset().top;
    var headerHeight = $('.ss-navbar').outerHeight();
    var height = $('.service-tablist').outerHeight();
    var top = '-' + height / 2 + 'px';
  
    if ($(window).width() > 767) {
      $('.service-tablist').css({
        'top': top
      });
  
      setTimeout(() => {
  
        $(window).scroll(function () {
          var sticky = $('.service-tablist'),
            scroll = $(window).scrollTop();
  
          if (scroll >= stickyOffset) {
            sticky.addClass('position-sticky').css({
              'top': headerHeight,
            });
          } else {
            sticky.removeClass('position-sticky').css({
              'top': top
            });
          }
        });
      });
    }
  }