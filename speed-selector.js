$(function() {
  var
    $speedArrow    = $('.speed-selector__arrow'),
    $vinyl__base   = $('.vinyl__base'),
    $vinyl__shadow = $('.vinyl__shadow'),
    $vinyl__label  = $('.vinyl__label');


  $('.speed-selector__33').mousedown(function () {
    $speedArrow.css({
      '-ms-transform'     : 'rotate(-37deg)',
      '-webkit-transform' : 'rotate(-37deg)',
      'transform'         : 'rotate(-37deg)'
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
      '-ms-transform'     : 'rotate(-55deg)',
      '-webkit-transform' : 'rotate(-55deg)',
      'transform'         : 'rotate(-55deg)'
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
      '-ms-transform'     : 'rotate(-73deg)',
      '-webkit-transform' : 'rotate(-73deg)',
      'transform'         : 'rotate(-73deg)'
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
});