$(function() {
  var
    $label                 = $('.label'),
    $label__element1       = $('.label__element').first(),
    $label__element2       = $label__element1.next(),
    speed            = 33,
    transition       = 300,
    delay            = 3000,
    turn             = 0,
    element1Img      = 1, //cycles between 1 and 3, odd only
    element2Img      = 0, //cycles between 2 and 4, even only
    isSpinning        = false;

/*  start animations when objects are visible  */

  $(window).scroll(function() {
    if (isInViewport($label) && !isSpinning) spin();
  });

/*  fourth page labels animation  */

  $label__element1.attr('src','label__33-1.svg');
  $label__element2.attr('src','label__33-2.svg');
    
  function spin() {
    isSpinning = true;

    animate(function(angle) {

      $label__element2.css({
        'transform' :  'rotate(' + (angle + (180 * turn)) + 'deg)',
        'opacity'   :  Math.abs(1 - turn - 1 / 180 * angle)
      });

      $label__element1.css({
        'transform' :  'rotate(' + (angle + (180 * turn) - 180) + 'deg)',
        'opacity'   :  Math.abs(turn - 1 / 180 * angle)
      });
    }, transition);
      
    if (isInViewport($label)) {
      setTimeout(spin, delay);
    } else {
      isSpinning = false;
    }
  }

  function animate(draw, duration) {
    var
      start = performance.now();

    requestAnimationFrame(function animate(time) {
      var
        timePassed = time - start,
        angle = timePassed * (180 / duration);

      if (angle > 180) angle = 180;
      if (angle < 0) angle = 0;
      
      draw(angle);
      
      if (timePassed < duration) {
        requestAnimationFrame(animate);
      } else {
        changeImg();
      }
    });
  }

  function changeImg() {
    if (turn == 0) {
      element2Img += 2;
      if (element2Img > 4) element2Img = 2;
       $label__element2
        .attr('src','label__' + speed +'-' + element2Img + '.svg');
    }

    if (turn == 1) {
      element1Img += 2;
      if (element1Img > 3) element1Img = 1;
       $label__element1
        .attr('src','label__' + speed +'-' + element1Img + '.svg');
    }

    turn++;
    if (turn > 1) turn = 0;
  }

/*  true if at least one pixel of object height is in viewport  */
  function isInViewport(object) {
    if ( object instanceof $ ) {
      var box = object[0].getBoundingClientRect();
    } else {
      var box = object.getBoundingClientRect();
    }
    return (
      box.top < (window.innerHeight || document.documentElement.clientHeight) &&
      box.bottom > (0)
    );
  };

  
});