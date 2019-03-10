$.fn.SVGAddClass = function (classTitle) {
  return this.each(function() {
    var oldClass = $(this).attr('class');

    oldClass = oldClass ? oldClass : '';

    $(this).attr('class', (oldClass+' '+classTitle).trim());
  });
}

$.fn.SVGRemoveClass = function (classTitle) {
  return this.each(function() {
    var
      oldClass = $(this).attr('class'),
      startpos = oldClass.indexOf(classTitle),
      endpos   = startpos + classTitle.length,
      newClass = oldClass.substring(0, startpos).trim() + ' ' + oldClass.substring(endpos).trim();
    
    if (!newClass.trim()) {
      $(this).removeAttr('class');
    } else {
      $(this).attr('class', newClass.trim());
    }
  });
}

$(window).load(function () {
  var scheme__svg     = $('.scheme__svg')[0],
      $scheme__menu   = $('.scheme__menu'),
      selectedItem    = defaultSelect = document.getElementById('disc'),
      $scheme__slider = $('.scheme__slider');

  if ('contentDocument' in scheme__svg) {
    var svgdom = scheme__svg.contentDocument;

    $('#'+$(defaultSelect).attr('id'), svgdom).SVGAddClass('highlight');
    moveSlider(defaultSelect);
    setTimeout(showSlider, 200);

    $scheme__menu.mousedown(function(event) {
      var target = event.target;

      if (target.tagName != 'LI') return;
      
      select(target);

      function select(node) {
        
        if (selectedItem) {
          var elementId = $(selectedItem).attr('id');

          $('#'+elementId, svgdom).SVGRemoveClass('highlight');
        }

        selectedItem = node;
        var elementId = $(selectedItem).attr('id');
        $('#'+elementId, svgdom).SVGAddClass('highlight');

        moveSlider(node);
      }
    });
  }
  function moveSlider(elem) {
    var
      box    = elem.getBoundingClientRect(),
      left   = box.left,
      top    = box.top,
      width  = box.width,
      height = box.height;

    $scheme__slider.css({
      'left'   : left + window.pageXOffset,
      'top'    : top + window.pageYOffset,
      'width'  : width,
      'height' : height
    });
  }

  function showSlider() {
    $scheme__slider.css('opacity','1');
  }

  $(window).resize(function() {
    moveSlider(selectedItem);
  });

});