$(document).ready(function() {

  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  
  });

  var idioma = navigator.language.substring(0,2);

  mostrarContenido(idioma);

  $("#idioma").click(function() {
    if (idioma === "es") {
      idioma = "en";
      $("#idioma").html("Español");
      mostrarContenido(idioma);
    } else {
      idioma = "es";
      $("#idioma").html("English");
      mostrarContenido(idioma);
    }
  });

  function mostrarContenido(idioma) {
    if (idioma === "es") {
      $(".contenido-es").show();
      $(".contenido-en").hide();
    } else {
      $(".contenido-es").hide();
      $(".contenido-en").show();
    }
  }

  var itemsPerPage = 3;
  var windowWidth = $(window).width();

  if (windowWidth < 800) {
    itemsPerPage = 1;
  }

  var aTags = $('#image-gallery a').filter(function() {
    return $(this).css('display') !== 'none';
  });
  var totalPages = Math.ceil(aTags.length / itemsPerPage);
  
  for (var i = 1; i <= totalPages; i++) {
    $('#pagination').append('<a class="page">' + i + '</a>');
  }
  
  showPage(1);
  
  function showPage(page) {
    var start = (page - 1) * itemsPerPage;
    var end = start + itemsPerPage;
    
    var contentSelector = idioma === 'en' ? '#image-gallery .contenido-en' : '#image-gallery .contenido-es';
    
    $(contentSelector).hide();
    $(contentSelector).slice(start, end).show();
    
    $('#pagination a').removeClass('active_btn');
    $('#pagination a:nth-child(' + page + ')').addClass('active_btn');
  }
  
  
  $('#pagination').on('click', '.page', function() {
    var page = $(this).text();
    showPage(page);
  });

  $(window).resize(function() {
    var windowWidth = $(window).width();
  
    if (windowWidth < 800) {
      itemsPerPage = 1;
    } else {
      itemsPerPage = 3;
    }
  
    var aTags = $('#image-gallery a').filter(function() {
      return $(this).css('display') !== 'none';
    });
    var totalPages = Math.ceil(aTags.length / itemsPerPage);
    $('#pagination').empty();

    for (var i = 1; i <= totalPages; i++) {
      $('#pagination').append('<a class="page">' + i + '</a>');
    }

    showPage(1);
  });

  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swipertwo = new Swiper(".mySwipertwo", {
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });

  $('a.enlace').click(function() {
    var destino = $(this.hash);
    if (destino.length == 0) {
      destino = $('a[name="' + this.hash.substr(1) + '"]');
    }
    if (destino.length == 0) {
      destino = $('html');
    }
    $('html, body').animate({ scrollTop: destino.offset().top }, 1000);
    return false;
  });

  $('.modal').modal();

  function mostrarModal() {
    var imagenSrc = $(this).data('imagen');
    var descripcionHtml = $(this).data('descripcion');
    var enlaceUrl = $(this).data('link');
  
    var $enlaceModal = $('#enlaceModal');
    $('#imagenModal').attr('src', imagenSrc);
    $('#descripcionModal').html(descripcionHtml);
    $enlaceModal.attr('href', enlaceUrl).html(enlaceUrl);
    if (enlaceUrl) {
      $enlaceModal.show();
    } else {
      $enlaceModal.hide();
    }
  }
  
  $('.modal-trigger').click(mostrarModal);  

});
  