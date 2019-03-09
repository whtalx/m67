$(function() {
  var
    $SVG_container  = $('.label__SVG-container'),
    $SVG_img1       = $('.label__SVG-img').first(),
    $SVG_img2       = $SVG_img1.next(),
    $leftArrow      = $('.label__left-arrow'),
    $rightArrow     = $('.label__right-arrow'),
    text_container  = document.querySelector('.label__text'),
    $text78         = $('.label__text-78'),
    $text33         = $('.label__text-33'),
    speed           = 78,
    transition      = 300,
    delay           = 3000,
    turn            = 0,
    timeout         = null,
    element1Img     = 1, //cycles between 1 and 3, odd only
    element2Img     = 0, //cycles between 2 and 4, even only
    isSpinning      = false,
    currentText     = 0,
    startX          = null;

/*  start animations when objects are visible  */

  $(window).scroll(function() {
    if (isInViewport($SVG_container) && !isSpinning) spin();
  });

/*  record labels animation  */

  $SVG_img1.attr('src','label__78-1.svg');
  $SVG_img2.attr('src','label__78-2.svg');
    
  function spin() {
    isSpinning = true;

    animate(function(angle) {

      $SVG_img2.css({
        'transform' :  'rotate(' + (angle + (180 * turn)) + 'deg)',
        'opacity'   :  Math.abs(1 - turn - 1 / 180 * angle)
      });

      $SVG_img1.css({
        'transform' :  'rotate(' + (angle + (180 * turn) - 180) + 'deg)',
        'opacity'   :  Math.abs(turn - 1 / 180 * angle)
      });
    }, transition);
      
    if (isInViewport($SVG_container)) {
      timeout = setTimeout(spin, delay);
    } else {
      isSpinning = false;
      clearTimeout(timeout);
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
    if (turn === 0) {
      element2Img += 2;
      if (element2Img > 4) element2Img = 2;
       $SVG_img2
        .attr('src','label__' + speed +'-' + element2Img + '.svg');
    }

    if (turn == 1) {
      element1Img += 2;
      if (element1Img > 3) element1Img = 1;
       $SVG_img1
        .attr('src','label__' + speed +'-' + element1Img + '.svg');
    }

    turn++;
    if (turn > 1) turn = 0;
  }

/*    labels description animation    */

  text_container.addEventListener('mousedown', lock, false);
  text_container.addEventListener('touchstart', lock, false);
  text_container.addEventListener('mouseup', move, false);
  text_container.addEventListener('touchend', move, false);
  $leftArrow.on('mousedown', slideToLeft);
  $rightArrow.on('mousedown', slideToRight);

  function unify(event) {
    return event.changedTouches ? event.changedTouches[0] : event;
  }

  function lock(event) {
    event.preventDefault();
    startX = unify(event).clientX;
  }

  function move(event) {
    if (startX || startX === 0) {
      let deltaX = unify(event).clientX - startX;

      if (deltaX < 0 && currentText === 0) {
        slideToRight();
        currentText = 1;
      } else if (deltaX > 0 && currentText == 1) {
        slideToLeft();
        currentText = 0;
      }

      startX = null;
    }
  }

  function slideToLeft() {
    speed = 78;
    
    if (turn === 0) {
     $SVG_img1
        .attr('src','label__' + speed +'-' + element2Img + '.svg');
    }

    if (turn == 1) {
      $SVG_img2
        .attr('src','label__' + speed +'-' + element1Img + '.svg');
    }

    clearTimeout(timeout);
    spin();

    $text78.css({
      '-webkit-transform' : 'translate(0)',
      'transform'         : 'translate(0)'
    });
    $text33.css({
      '-webkit-transform' : 'translate(0)',
      'transform'         : 'translate(0)'
    });
    $leftArrow.css({
      'opacity'           : '0',
      'z-index'           : '-1',
      'cursor'            : 'default'
    });
    $rightArrow.css({
      'opacity'           : '1',
      'z-index'           : '1',
      'cursor'            : 'pointer'
    });
  }

  function slideToRight() {
    speed = 33;

    if (turn === 0) {
     $SVG_img1
        .attr('src','label__' + speed +'-' + element2Img + '.svg');
    }

    if (turn == 1) {
      $SVG_img2
        .attr('src','label__' + speed +'-' + element1Img + '.svg');
    }

    clearTimeout(timeout);
    spin();
    
    $text78.css({
      '-webkit-transform' : 'translate(-106%)',
      'transform'         : 'translate(-106%)'
    });
    $text33.css({
      '-webkit-transform' : 'translate(-106%)',
      'transform'         : 'translate(-106%)'
    });
    $leftArrow.css({
      'opacity'           : '1',
      'z-index'           : '1',
      'cursor'            : 'pointer'
    });
    $rightArrow.css({
      'opacity'           : '0',
      'z-index'           : '-1',
      'cursor'            : 'default'
    });
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