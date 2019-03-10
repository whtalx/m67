$(function() {
  var
    $title         = $('.title'),
    $first         = $('.first'),
    $speedArrow    = $('.speed-selector__arrow'),
    $vinyl__base   = $('.vinyl__base'),
    $vinyl__shadow = $('.vinyl__shadow'),
    $vinyl__label  = $('.vinyl__label'),
    viewportHeight = $(window).height();


  $(window).scroll(function() {
    var opacity = toTop() / viewportHeight;

    if (opacity >= 0) {
      $title.css({
        'display' : 'block',
        'opacity' : opacity
      });
    } else if (opacity < 0) {
      $title.css({
        'display' : 'none'
      });
    }
  });

  $('.speed-selector__33').mousedown(function () {
    $speedArrow.css({
      '-webkit-transform' : 'rotate(-35deg)',
      'transform'         : 'rotate(-35deg)'
    });
    $vinyl__base.css({
      '-webkit-animation-duration' : '.9s',
      'animation-duration'         : '.9s'
    });
    $vinyl__shadow.css({
      '-webkit-animation-duration' : '1.8s',
      'animation-duration'         : '1.8s'
    });
    $vinyl__label.css({
      '-webkit-animation-duration' : '1.8s',
      'animation-duration'         : '1.8s'
    });
  });

  $('.speed-selector__45').mousedown(function () {
    $speedArrow.css({
      '-webkit-transform' : 'rotate(-57deg)',
      'transform'         : 'rotate(-57deg)'
    });
    $vinyl__base.css({
      '-webkit-animation-duration' : '.7s',
      'animation-duration'         : '.7s'
    });
    $vinyl__shadow.css({
      '-webkit-animation-duration' : '1.3s',
      'animation-duration'         : '1.3s'
    });
    $vinyl__label.css({
      '-webkit-animation-duration' : '1.3s',
      'animation-duration'         : '1.3s'
    });
  });

  $('.speed-selector__78').mousedown(function () {
    $speedArrow.css({
      '-webkit-transform' : 'rotate(-75deg)',
      'transform'         : 'rotate(-75deg)'
    });
    $vinyl__base.css({
      '-webkit-animation-duration' : '.3s',
      'animation-duration'         : '.3s'
    });
    $vinyl__shadow.css({
      '-webkit-animation-duration' : '.77s',
      'animation-duration'         : '.77s'
    });
    $vinyl__label.css({
      '-webkit-animation-duration' : '.77s',
      'animation-duration'         : '.77s'
    });
  });

  function toTop() {
    var box = $first[0].getBoundingClientRect();
    return (
      box.top
    );
  };


});