'use strict'
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
    label__leftArrow = document.getElementsByClassName('label__arrow-left')[0],
    label__rightArrow = document.getElementsByClassName('label__arrow-right')[0],
    label__text = document.getElementsByClassName('label__text')[0],
    label__holder = document.getElementsByClassName('label__text-holder')[0];

  let
    isVinylRotating = true,
    schemeSelectedItem = document.getElementById('disc'),
    schemeTimer = null,
    labelSpeed = 78,
    labelDelay = 4000,
    labelTurn = 0,
    labelTimer = null,
    labelElement1Img = 1, //cycles between 1 and 3, odd only
    labelElement2Img = 4, //cycles between 2 and 4, even only
    labelTextWidth = label__text.getBoundingClientRect().width,
    labelTouchStartX = undefined,
    labelTouchMoveX = undefined,
    labelMoveX = undefined,
    labelCurrentText = 0,
    labelLastText = 0,
    isLabelSpinning = false;

  window.addEventListener('scroll', () => {
    if (isInViewport(vinyl) && !isVinylRotating) {
      rotate();
    } else if (!isInViewport(vinyl) && isVinylRotating) {
      stopRotating();
    }
    if (isInViewport(label__SVGcontainer) && !isLabelSpinning) {
      spin();
    } else if (!isInViewport(label__SVGcontainer) && isLabelSpinning) {
      stopSpinning();
    }
    if (isInViewport(label__rightArrow) && !label__rightArrow.classList.contains('label__arrow_animated')) {
      label__rightArrow.classList.add('label__arrow_animated')
    } else if (!isInViewport(label__rightArrow) && label__rightArrow.classList.contains('label__arrow_animated')) {
      label__rightArrow.classList.remove('label__arrow_animated')
    }
  });

  window.addEventListener('resize', () => {
    if (schemeTimer) clearTimeout(schemeTimer);
    sliderOpacity('0');
    moveSlider(schemeSelectedItem);
    schemeTimer = setTimeout(sliderOpacity, 300);

    labelTextWidth = label__text.getBoundingClientRect().width;
    label__holder.classList.remove('label__text-holder_animate');
    label__holder.style.transform = 'translateX(-' + labelCurrentText*labelTextWidth + 'px)';
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

    moveSlider(schemeSelectedItem);
    schemeTimer = setTimeout(sliderOpacity, 200);

    scheme__menu.addEventListener('click', event => {
      const target = event.target;

      if (target.tagName != 'LI') return;

      select(target);

      function select(node) {
        if (schemeSelectedItem) {
          let elementId = schemeSelectedItem.getAttribute('id');
          svgdom.getElementById(elementId).classList.remove('highlight');
        }

        schemeSelectedItem = node;
        let elementId = schemeSelectedItem.getAttribute('id');
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

  label__holder.addEventListener('touchstart', touchStart);
  label__holder.addEventListener('touchmove', touchMove);
  label__holder.addEventListener('touchend', touchEnd);
  label__rightArrow.addEventListener('mousedown', switchText);

  function spin() {
    isLabelSpinning = true;

    label__SVGimg1.classList.toggle('label__SVG-img_down');
    label__SVGimg2.classList.toggle('label__SVG-img_down');

    changeImg();
    
    if (isInViewport(label__SVGcontainer)) {
      labelTimer = setTimeout(spin, labelDelay);
    } else {
      stopSpinning();
    }
  }

  function stopSpinning() {
    isLabelSpinning = false;
    clearTimeout(labelTimer);
  }

  function changeImg() {
    if (labelTurn == 1) {
      labelElement2Img += 2;
      if (labelElement2Img > 4) labelElement2Img = 2;
      label__SVGimg2.addEventListener('animationend', event => {
        event.target.setAttribute('src', 'label__' + labelSpeed + '-' + labelElement2Img + '.svg');
      });
    }

    if (labelTurn === 0) {
      labelElement1Img += 2;
      if (labelElement1Img > 3) labelElement1Img = 1;
      label__SVGimg1.addEventListener('animationend', event => {
        event.target.setAttribute('src', 'label__' + labelSpeed + '-' + labelElement1Img + '.svg');
      });
    }

    labelTurn++;
    if (labelTurn > 1) labelTurn = 0;
  }

  function touchStart(event) {
    labelTouchStartX =  event.touches[0].pageX;
    label__holder.classList.remove('label__text-holder_animate');
  }

  function touchMove(event) {
    labelTouchMoveX =  event.touches[0].pageX;
    labelMoveX = labelCurrentText * labelTextWidth + (labelTouchStartX - labelTouchMoveX);
    if (labelMoveX < labelTextWidth) {
      label__holder.style.transform = 'translateX(-' + labelMoveX + 'px)';
    }
  }

  function touchEnd() {
    let absMove = Math.abs(labelCurrentText * labelTextWidth - labelMoveX);
    if (absMove > labelTextWidth / 2) {
      if (labelMoveX > labelCurrentText * labelTextWidth && labelCurrentText === 0) {
        labelLastText = labelCurrentText;
        labelCurrentText = 1;
      } else if (labelMoveX < labelCurrentText*labelTextWidth && labelCurrentText == 1) {
        labelLastText = labelCurrentText;
        labelCurrentText = 0;
      }
    } else {
      labelLastText = labelCurrentText;
    }
    
    swipeText();
    if (labelLastText !== labelCurrentText) switchSpeed(labelCurrentText);
  }

  function swipeText() {
    label__holder.classList.add('label__text-holder_animate');
    label__holder.style.transform = 'translateX(-' + labelCurrentText*labelTextWidth + 'px)';
  }

  function switchText() {
    if (labelCurrentText === 0) {
      labelLastText = labelCurrentText;
      labelCurrentText = 1;
    } else if (labelCurrentText == 1) {
      labelLastText = labelCurrentText;
      labelCurrentText = 0;
    }

    swipeText();
    switchSpeed(labelCurrentText);
  }

  function switchSpeed(num) {
    if (num === 0) {
      labelSpeed = 78;
      label__leftArrow.removeEventListener('mousedown', switchText);
      label__rightArrow.addEventListener('mousedown', switchText);
    } else if (num == 1) {
      labelSpeed = 33;
      label__leftArrow.addEventListener('mousedown', switchText);
      label__rightArrow.removeEventListener('mousedown', switchText);
    }

    if (labelTurn === 0) {
      label__SVGimg2.setAttribute('src', 'label__' + labelSpeed + '-' + labelElement2Img + '.svg');
    } else if (labelTurn == 1) {
      label__SVGimg1.setAttribute('src', 'label__' + labelSpeed + '-' + labelElement1Img + '.svg');
    }

    clearTimeout(labelTimer);
    spin();

    label__leftArrow.classList.toggle('label__arrow_hidden');
    label__rightArrow.classList.toggle('label__arrow_hidden');
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