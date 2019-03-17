"use strict"
window.addEventListener('load', () => {
  const
    vinyl          = document.getElementsByClassName('vinyl')[0],
    vinyl__base    = document.getElementsByClassName('vinyl__base')[0],
    vinyl__shadow  = document.getElementsByClassName('vinyl__shadow')[0],
    speedArrow     = document.getElementsByClassName('speed-selector__arrow')[0],
    speedNumbers   = document.getElementsByClassName('speed-selector__numbers')[0],
    speed__33      = document.getElementsByClassName('speed-selector__33')[0],
    speed__45      = document.getElementsByClassName('speed-selector__45')[0],
    speed__78      = document.getElementsByClassName('speed-selector__78')[0],
    scheme__svg    = document.getElementsByClassName('scheme__svg')[0],
    scheme__menu   = document.getElementsByClassName('scheme__menu')[0],
    scheme__slider = document.getElementsByClassName('scheme__slider')[0],
    SVG_container  = document.getElementsByClassName('label__SVG-container')[0],
    SVG_img1       = document.getElementsByClassName('label__SVG-img')[0],
    SVG_img2       = document.getElementsByClassName('label__SVG-img')[1],
    leftArrow      = document.getElementsByClassName('label__left-arrow')[0],
    rightArrow     = document.getElementsByClassName('label__right-arrow')[0],
    text_container = document.getElementsByClassName('label__text')[0],
    text78         = document.getElementsByClassName('label__text-78')[0],
    text33         = document.getElementsByClassName('label__text-33')[0];

  let
    viewportHeight    = window.innerHeight,
    isVinylRotating   = true,
    selectedItem      = document.getElementById('disc'),
    defaultSelectedId = selectedItem.getAttribute('id'),
    sliderTimer       = null,
    textWidth         = text78.getBoundingClientRect().width,
    speed             = 78,
    transition        = 300,
    delay             = 3000,
    turn              = 0,
    timeout           = null,
    element1Img       = 1, //cycles between 1 and 3, odd only
    element2Img       = 0, //cycles between 2 and 4, even only
    isLabelSpinning   = false,
    currentText       = 0,
    startX            = null,
    startY            = null,
    absX              = null,
    absY              = null,
    swipe             = null,
    isScroll          = true;

  window.addEventListener('scroll', () => {
    if (isInViewport(vinyl) && !isVinylRotating) {
      rotate();
    } else if (!isInViewport(vinyl) && isVinylRotating) {
      stopRotating();
    }
    if (isInViewport(SVG_container) && !isLabelSpinning) spin();
  });

  window.addEventListener('resize', () => {
    if (sliderTimer) clearTimeout(sliderTimer);
    sliderOpacity('0');
    moveSlider(selectedItem);
    sliderTimer = setTimeout(sliderOpacity, 300);
  });

  /********************************/
  /* cover vinyl & speed selector */
  speedNumbers.addEventListener('click', event => {
    const target = event.target;

    if (target.className == 'speed-selector__33') {
      setSpeed(33);
    } else if (target.className == 'speed-selector__45') {
      setSpeed(45);
    } else if (target.className == 'speed-selector__78') {
      setSpeed(78);
    } else return;
  });

  function rotate() {
    isVinylRotating = true;
    vinyl__shadow.style.animationPlayState = 'running';
    vinyl__base.style.animationPlayState   = 'running';
  }

  function stopRotating() {
    isVinylRotating = false;
    vinyl__shadow.style.animationPlayState = 'paused';
    vinyl__base.style.animationPlayState   = 'paused';
  }

  function setSpeed(speed) {
    if (speed == 33) {
      speedArrow.style.WebkitTransform      = 'rotate(-45deg)';
      speedArrow.style.transform            = 'rotate(-45deg)';
      vinyl__shadow.style.animationDuration = '1.818181s';
      vinyl__base.style.animationDuration   = '.9s';
    } else if (speed == 45) {
      speedArrow.style.WebkitTransform      = 'rotate(-57.5deg)';
      speedArrow.style.transform            = 'rotate(-57.5deg)';
      vinyl__shadow.style.animationDuration = '1.333333s';
      vinyl__base.style.animationDuration   = '.666666s';
    } else if (speed == 78) {
      speedArrow.style.WebkitTransform      = 'rotate(-68deg)';
      speedArrow.style.transform            = 'rotate(-68deg)';
      vinyl__shadow.style.animationDuration = '.769231s';
      vinyl__base.style.animationDuration   = '.384615s';
    }
  }
  /**********/
  /* scheme */
  if ('contentDocument' in scheme__svg) {
    const svgdom = scheme__svg.contentDocument;

    moveSlider(selectedItem);
    sliderTimer = setTimeout(sliderOpacity, 200);

    scheme__menu.addEventListener('click', event => {
      const target = event.target;

      if (target.tagName != 'LI') return;
      
      select(target);

      function select(node) {
        
        if (selectedItem) {
          let elementId = selectedItem.getAttribute('id');

        svgdom.getElementById(elementId).setAttribute('class', 'scheme-path');
        }

        selectedItem = node;
        let elementId = selectedItem.getAttribute('id');
        svgdom.getElementById(elementId).setAttribute('class', 'scheme-path highlight');

        moveSlider(node);
      }
    }, false);
  }

  function moveSlider(elem) {
    let
      box    = elem.getBoundingClientRect(),
      left   = box.left,
      top    = box.top,
      width  = box.width,
      height = box.height;

    scheme__slider.style.left = left + window.pageXOffset + 'px';
    scheme__slider.style.top = top + window.pageYOffset + 'px';
    scheme__slider.style.width = width + 'px';
    scheme__slider.style.height = height + 'px';
  }

  function sliderOpacity(op) {
    if (op === undefined) op = '1';
    scheme__slider.style.opacity = op;
  }
  /*********/
  /* label */
  SVG_img1.setAttribute('src', 'label__78-1.svg');
  SVG_img2.setAttribute('src', 'label__78-2.svg');

  text_container.addEventListener('touchend', move, false);
  text_container.addEventListener('touchstart', lock, false);
  leftArrow.addEventListener('mousedown', slideToLeft, false);
  rightArrow.addEventListener('mousedown', slideToRight, false);

  function spin() {
    isLabelSpinning = true;

    animate(angle => {
      SVG_img2.style.transform = 'rotate(' + (angle + (180 * turn)) + 'deg)';
      SVG_img2.style.opacity = Math.abs(1 - turn - 1 / 180 * angle)
      
      SVG_img1.style.transform = 'rotate(' + (angle + (180 * turn) - 180) + 'deg)';
      SVG_img1.style.opacity = Math.abs(turn - 1 / 180 * angle);
    }, transition);
      
    if (isInViewport(SVG_container)) {
      timeout = setTimeout(spin, delay);
    } else {
      isLabelSpinning = false;
      clearTimeout(timeout);
    }
  }

  function animate(draw, duration) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      let
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
       SVG_img2.setAttribute('src','label__' + speed +'-' + element2Img + '.svg');
    }

    if (turn == 1) {
      element1Img += 2;
      if (element1Img > 3) element1Img = 1;
       SVG_img1.setAttribute('src','label__' + speed +'-' + element1Img + '.svg');
    }

    turn++;
    if (turn > 1) turn = 0;
  }

  function unify(event) {
    return event.changedTouches ? event.changedTouches[0] : event;
  }

  function lock(event) {
    const target = event.target;
    if (target.className == 'label__right-arrow' ||
      target.className == 'label__left-arrow' ) {
        text_container.removeEventListener('touchmove', drag, false);
    }

    startX = unify(event).clientX;
    startY = unify(event).clientY;
    textWidth = text78.getBoundingClientRect().width;
    text_container.addEventListener('touchmove', drag, false);
  }

  function drag(event) {
    absX = Math.abs(unify(event).clientX - startX);
    absY = Math.abs(unify(event).clientY - startY);
    swipe = (unify(event).clientX - startX) / textWidth * (100);

    if (absX <= absY) return;

    else if (absX > absY) {

      event.preventDefault();

      if (swipe > 0 && currentText == 1) translate('-' + (106 - swipe));
      if (swipe < 0 && currentText === 0) translate(swipe);
    }
  }

  function move(event) {
    if (Math.abs(swipe) < 16) {
          if (currentText == 1) translate('-106');
          if (currentText === 0) translate('0');
        }

    if (startX || startY || startX === 0 || startY === 0) {
      absX = Math.abs(unify(event).clientX - startX);
      absY = Math.abs(unify(event).clientY - startY);

      if (absX > absY) {
        event.preventDefault();
        let deltaX = unify(event).clientX - startX;

        if (Math.abs(swipe) < 24) {
          if (currentText == 1) translate('-106');
          if (currentText === 0) translate('0');
        } else if (deltaX < 0 && currentText === 0) {
          slideToRight();
        } else if (deltaX > 0 && currentText == 1) {
          slideToLeft();
        }

        startX = null;
      }
    }

    text_container.removeEventListener('touchmove', drag, false);
  }

  function slideToLeft() {
    text_container.removeEventListener('touchmove', drag, false);
    speed = 78;
    currentText = 0;
    
    if (turn === 0) {
     SVG_img1.setAttribute('src','label__' + speed +'-' + element2Img + '.svg');
    }

    if (turn == 1) {
      SVG_img2.setAttribute('src','label__' + speed +'-' + element1Img + '.svg');
    }

    clearTimeout(timeout);
    spin();
    translate('0');

    leftArrow.style.opacity = '0';
    leftArrow.style.zIndex  = '-1';
    leftArrow.style.cursor  = 'default';

    rightArrow.style.opacity = '1';
    rightArrow.style.zIndex  = '1';
    rightArrow.style.cursor  = 'pointer';

  }

  function slideToRight() {
    text_container.removeEventListener('touchmove', drag, false);
    speed = 33;
    currentText = 1;

    if (turn === 0) {
     SVG_img1.setAttribute('src','label__' + speed +'-' + element2Img + '.svg');
    }

    if (turn == 1) {
      SVG_img2.setAttribute('src','label__' + speed +'-' + element1Img + '.svg');
    }

    clearTimeout(timeout);
    spin();
    
    translate('-106');

    leftArrow.style.opacity = '1';
    leftArrow.style.zIndex  = '1';
    leftArrow.style.cursor  = 'pointer';

    rightArrow.style.opacity = '0';
    rightArrow.style.zIndex  = '-1';
    rightArrow.style.cursor  = 'default';
  }

  function translate(percent) {
    text78.style.WebkitTransform = 'translate(' + percent + '%)';
    text78.style.transform       = 'translate(' + percent + '%)';    
    text33.style.WebkitTransform = 'translate(' + percent + '%)';
    text33.style.transform       = 'translate(' + percent + '%)';
  }
  /*********/
  function isInViewport(object) {
    const box = object.getBoundingClientRect();
    
    return (
      box.top < (window.innerHeight || document.documentElement.clientHeight) &&
      box.bottom > (0)
    );
  };
});