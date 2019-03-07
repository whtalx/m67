$(function() {
  var
    $label           = $('.label'),
    $label__element1 = $('.label__element').first(),
    $label__element2 = $label__element1.next(),
    transition       = 300,
    delay            = 3000,
    turn             = 0,
    element1Img      = 1,
    element2Img      = 2,
    isSpinning       = false;

  $label__element1.attr('src','label__33-1.svg');
  $label__element2.attr('src','label__33-2.svg');

  $(window).scroll(function() {
    if (isInViewport() && !isSpinning) spin();
  });
    
  function spin() {
    isSpinning = true;
    animate(function(angle) {
      $label__element2.css({
        'transform' :  'rotate(' + (angle + (180 * turn)) + 'deg)',
        'opacity'   :  Math.abs(1 - turn / 1 - 1 / 180 * angle)
      });
      $label__element1.css({
        'transform' :  'rotate(' + (180 + angle + (180 * turn)) + 'deg)',
        'opacity'   :  Math.abs(1 - turn / 1 - 1 / 180 * (180 + angle))
      });
    }, transition);
      
    if (isInViewport()) setTimeout(spin, delay); else isSpinning = false;
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
        turn++;
        if (turn > 1) turn = 0;
      }
    });
  }

  function isInViewport() {
    var position = document.getElementsByClassName('label')[0].getBoundingClientRect();
    return(
        position.top < (window.innerHeight || document.documentElement.clientHeight) &&
        position.bottom > (0)
    );
  };

  function changeImg() {
    if (turn == 0) {
      element2Img++;
      if (element2Img > 3) element2Img = 1;
       $label__element2.attr('src','label__33-' + element2Img + '.svg');
    }
    if (turn == 1) {
      element1Img++;
      if (element1Img > 3) element1Img = 1;
       $label__element1.attr('src','label__33-' + element1Img + '.svg');
    }
    
  }
});