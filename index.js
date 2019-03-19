"use strict"
window.addEventListener('load', () => {
  const
    img = document.getElementsByTagName('IMG'),
    vinyl = document.getElementsByClassName('vinyl')[0],
    vinyl__base = document.getElementsByClassName('vinyl__base')[0],
    vinyl__shadow = document.getElementsByClassName('vinyl__shadow')[0],
    speedSelector__arrow = document.getElementsByClassName('speed-selector__arrow')[0],
    speedSelector__numbers = document.getElementsByClassName('speed-selector__numbers')[0],
    scheme__svg = document.getElementsByClassName('scheme__svg')[0],
    scheme__menu = document.getElementsByClassName('scheme__menu')[0],
    scheme__slider = document.getElementsByClassName('scheme__slider')[0],
    label__SVGcontainer = document.getElementsByClassName('label__SVG-container')[0],
    label__SVGimg1 = document.getElementsByClassName('label__SVG-img')[0],
    label__SVGimg2 = document.getElementsByClassName('label__SVG-img')[1],
    label__leftArrow = document.getElementsByClassName('label__left-arrow')[0],
    label__rightArrow = document.getElementsByClassName('label__right-arrow')[0],
    label__text = document.getElementsByClassName('label__text')[0],
    label__text33 = document.getElementsByClassName('label__text-33')[0],
    label__text78 = document.getElementsByClassName('label__text-78')[0];

  let
    isVinylRotating = true,
    selectedItem = document.getElementById('disc'),
    sliderTimer = null,
    textWidth = label__text78.getBoundingClientRect().width,
    speed = 78,
    transition = 300,
    delay = 3000,
    turn = 0,
    timeout = null,
    element1Img = 1, //cycles between 1 and 3, odd only
    element2Img = 0, //cycles between 2 and 4, even only
    isLabelSpinning = false,
    currentText = 0,
    startX = null,
    startY = null,
    absX = null,
    absY = null,
    swipe = null;

  window.addEventListener('scroll', () => {
    if (isInViewport(vinyl) && !isVinylRotating) {
      rotate();
    } else if (!isInViewport(vinyl) && isVinylRotating) {
      stopRotating();
    }
    if (isInViewport(label__SVGcontainer) && !isLabelSpinning) spin();
  });

  window.addEventListener('resize', () => {
    if (sliderTimer) clearTimeout(sliderTimer);
    sliderOpacity('0');
    moveSlider(selectedItem);
    sliderTimer = setTimeout(sliderOpacity, 300);
  });

  Array.from(img).forEach(i => {
    i.addEventListener('mousedown', event => {
      event.preventDefault();
    });
  });
 
  /********************************/
  /* cover vinyl & speed selector */
  speedSelector__numbers.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('speed-selector__33')) {
      setSpeed(33);
    } else if (target.classList.contains('speed-selector__45')) {
      setSpeed(45);
    } else if (target.classList.contains('speed-selector__78')) {
      setSpeed(78);
    } else return;
  });

  function rotate() {
    isVinylRotating = true;
    vinyl__shadow.classList.remove('vinyl_paused');
    vinyl__base.classList.remove('vinyl_paused');
  }

  function stopRotating() {
    isVinylRotating = false;
    vinyl__shadow.classList.add('vinyl_paused');
    vinyl__base.classList.add('vinyl_paused');
  }

  function setSpeed(speed) {
    if (speed == 33) {
      speedSelector__arrow.classList.remove('speed-selector__arrow_45', 'speed-selector__arrow_78');
      speedSelector__arrow.classList.add('speed-selector__arrow_33');

      vinyl__shadow.classList.remove('vinyl__shadow_45', 'vinyl__shadow_78');
      vinyl__shadow.classList.add('vinyl__shadow_33');

      vinyl__base.classList.remove('vinyl__base_45', 'vinyl__base_78');
      vinyl__base.classList.add('vinyl__base_33');
    } else if (speed == 45) {
      speedSelector__arrow.classList.remove('speed-selector__arrow_33', 'speed-selector__arrow_78');
      speedSelector__arrow.classList.add('speed-selector__arrow_45');
      
      vinyl__shadow.classList.remove('vinyl__shadow_33', 'vinyl__shadow_78');
      vinyl__shadow.classList.add('vinyl__shadow_45');
      
      vinyl__base.classList.remove('vinyl__base_33', 'vinyl__base_78');
      vinyl__base.classList.add('vinyl__base_45');
    } else if (speed == 78) {
      speedSelector__arrow.classList.remove('speed-selector__arrow_33', 'speed-selector__arrow_45');
      speedSelector__arrow.classList.add('speed-selector__arrow_78');
      
      vinyl__shadow.classList.remove('vinyl__shadow_33', 'vinyl__shadow_45');
      vinyl__shadow.classList.add('vinyl__shadow_78');
      
      vinyl__base.classList.remove('vinyl__base_33', 'vinyl__base_45');
      vinyl__base.classList.add('vinyl__base_78');
    }
  }
  /*********************/
  /* third page scheme */
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
          svgdom.getElementById(elementId).classList.remove('highlight');
        }

        selectedItem = node;
        let elementId = selectedItem.getAttribute('id');
        svgdom.getElementById(elementId).classList.add('highlight');

        moveSlider(node);
      }
    }, false);
  }

  function moveSlider(elem) {
    let
      box = elem.getBoundingClientRect(),
      left = box.left,
      top = box.top,
      width = box.width,
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
  /*********************/
  /* fourth page label */
  label__SVGimg1.setAttribute('src', 'label__78-1.svg');
  label__SVGimg2.setAttribute('src', 'label__78-2.svg');

  label__text.addEventListener('touchend', move, false);
  label__text.addEventListener('touchstart', lock, false);
  label__leftArrow.addEventListener('mousedown', slideToLeft, false);
  label__rightArrow.addEventListener('mousedown', slideToRight, false);

  function spin() {
    isLabelSpinning = true;

    animate(angle => {
      label__SVGimg2.style.transform = 'rotate(' + (angle + (180 * turn)) + 'deg)';
      label__SVGimg2.style.opacity = Math.abs(1 - turn - 1 / 180 * angle)

      label__SVGimg1.style.transform = 'rotate(' + (angle + (180 * turn) - 180) + 'deg)';
      label__SVGimg1.style.opacity = Math.abs(turn - 1 / 180 * angle);
    }, transition);

    if (isInViewport(label__SVGcontainer)) {
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
      label__SVGimg2.setAttribute('src', 'label__' + speed + '-' + element2Img + '.svg');
    }

    if (turn == 1) {
      element1Img += 2;
      if (element1Img > 3) element1Img = 1;
      label__SVGimg1.setAttribute('src', 'label__' + speed + '-' + element1Img + '.svg');
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
      target.className == 'label__left-arrow') {
      label__text.removeEventListener('touchmove', drag, false);
    }

    startX = unify(event).clientX;
    startY = unify(event).clientY;
    textWidth = label__text78.getBoundingClientRect().width;
    label__text.addEventListener('touchmove', drag, false);
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

    label__text.removeEventListener('touchmove', drag, false);
  }

  function slideToLeft() {
    label__text.removeEventListener('touchmove', drag, false);
    speed = 78;
    currentText = 0;

    if (turn === 0) {
      label__SVGimg1.setAttribute('src', 'label__' + speed + '-' + element2Img + '.svg');
    }

    if (turn == 1) {
      label__SVGimg2.setAttribute('src', 'label__' + speed + '-' + element1Img + '.svg');
    }

    clearTimeout(timeout);
    spin();
    translate('0');

    label__leftArrow.style.opacity = '0';
    label__leftArrow.style.zIndex = '-1';
    label__leftArrow.style.cursor = 'default';

    label__rightArrow.style.opacity = '1';
    label__rightArrow.style.zIndex = '1';
    label__rightArrow.style.cursor = 'pointer';
  }

  function slideToRight() {
    label__text.removeEventListener('touchmove', drag, false);
    speed = 33;
    currentText = 1;

    if (turn === 0) {
      label__SVGimg1.setAttribute('src', 'label__' + speed + '-' + element2Img + '.svg');
    }

    if (turn == 1) {
      label__SVGimg2.setAttribute('src', 'label__' + speed + '-' + element1Img + '.svg');
    }

    clearTimeout(timeout);
    spin();
    translate('-106');

    label__leftArrow.style.opacity = '1';
    label__leftArrow.style.zIndex = '1';
    label__leftArrow.style.cursor = 'pointer';

    label__rightArrow.style.opacity = '0';
    label__rightArrow.style.zIndex = '-1';
    label__rightArrow.style.cursor = 'default';
  }

  function translate(percent) {
    label__text78.style.WebkitTransform = 'translate(' + percent + '%)';
    label__text78.style.transform = 'translate(' + percent + '%)';
    label__text33.style.WebkitTransform = 'translate(' + percent + '%)';
    label__text33.style.transform = 'translate(' + percent + '%)';
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