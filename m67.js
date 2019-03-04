$.fn.SVGAddClass = function (classTitle) {
  return this.each(function() {
    var oldClass = $(this).attr('class');
    oldClass = oldClass ? oldClass : '';
    $(this).attr('class', (oldClass+' '+classTitle).trim());
  });
}

$.fn.SVGRemoveClass = function (classTitle) {
  return this.each(function() {
    var oldClass = $(this).attr('class');
    var startpos = oldClass.indexOf(classTitle);
    var endpos = startpos + classTitle.length;
    var newClass = oldClass.substring(0, startpos).trim() + ' ' + oldClass.substring(endpos).trim();
    if (!newClass.trim())
      $(this).removeAttr('class');
    else
      $(this).attr('class', newClass.trim());
  });
}

$(window).load(function () {
  var scheme__svg = $('.scheme__svg')[0],
      $scheme__menu = $('.scheme__menu'),
      selectedItem = defaultSelect = $('.scheme__disc')[0],
      $scheme__slider = $('.scheme__slider');

  if ('contentDocument' in scheme__svg) {
    var
      svgdom = scheme__svg.contentDocument;

    $('#'+$(defaultSelect).attr('class'), svgdom).SVGAddClass('highlight');
    defaultSelect.classList.add('scheme__menu_selected');
    moveSlider(defaultSelect);
    setTimeout(showSlider, 200);

    $scheme__menu.mousedown(function(event) {
      var target = event.target;
      if (target.tagName != 'LI') return;
      
      select(target);

      function select(node) {
        
        if (selectedItem) {
          selectedItem.classList.remove('scheme__menu_selected');
          var className = $(selectedItem).attr('class');
          $('#'+className, svgdom).SVGRemoveClass('highlight');
        }

        selectedItem = node;
        var className = $(selectedItem).attr('class');
        $('#'+className, svgdom).SVGAddClass('highlight');
        selectedItem.classList.add('scheme__menu_selected');

        moveSlider(node);
      }
    });
  }
  function moveSlider(elem) {
    var
      box = elem.getBoundingClientRect(),
      left = box.left,
      top = box.top,
      width = box.width,
      height = box.height;

    $scheme__slider.css({
      'left'   : left + pageXOffset,
      'top'    : top + pageYOffset,
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