$.fn.SVGAddClass = function (classTitle) {
  return this.each(function() {
    var oldClass = $(this).attr("class");
    oldClass = oldClass ? oldClass : '';
    $(this).attr("class", (oldClass+" "+classTitle).trim());
  });
}

$.fn.SVGRemoveClass = function (classTitle) {
  return this.each(function() {
    var oldClass = $(this).attr("class");
    var startpos = oldClass.indexOf(classTitle);
    var endpos = startpos + classTitle.length;
    var newClass = oldClass.substring(0, startpos).trim() + " " + oldClass.substring(endpos).trim();
    if (!newClass.trim())
      $(this).removeAttr("class");
    else
      $(this).attr("class", newClass.trim());
  });
}

$(window).load(function () {
  var
    speedArrow    = $('.speed_selector__arrow'),
    vinyl__base   = $('.vinyl__base'),
    vinyl__shadow = $('.vinyl__shadow'),
    vinyl__label  = $('.vinyl__label');

  $('.speed_selector__33').mousedown(function () {
    speedArrow.css({
      '-ms-transform'     : 'rotate(-37deg)',
      '-webkit-transform' : 'rotate(-37deg',
      'transform'         : 'rotate(-37deg)'
    });
    vinyl__base.css({
      '-webkit-animation-duration' : '.9s',
      'animation-duration'         : '.9s'
    });
    vinyl__shadow.css({
      '-webkit-animation-duration' : '1.8s',
      'animation-duration'         : '1.8s'
    });
    vinyl__label.css({
      '-webkit-animation-duration' : '1.8s',
      'animation-duration'         : '1.8s'
    });
  });

  $('.speed_selector__45').mousedown(function () {
    speedArrow.css({
      '-ms-transform'     : 'rotate(-55deg)',
      '-webkit-transform' : 'rotate(-55deg',
      'transform'         : 'rotate(-55deg)'
    });
    vinyl__base.css({
      '-webkit-animation-duration' : '.7s',
      'animation-duration'         : '.7s'
    });
    vinyl__shadow.css({
      '-webkit-animation-duration' : '1.3s',
      'animation-duration'         : '1.3s'
    });
    vinyl__label.css({
      '-webkit-animation-duration' : '1.3s',
      'animation-duration'         : '1.3s'
    });
  });

  $('.speed_selector__78').mousedown(function () {
    speedArrow.css({
      '-ms-transform'     : 'rotate(-73deg)',
      '-webkit-transform' : 'rotate(-73deg',
      'transform'         : 'rotate(-73deg)'
    });
    vinyl__base.css({
      '-webkit-animation-duration' : '.3s',
      'animation-duration'         : '.3s'
    });
    vinyl__shadow.css({
      '-webkit-animation-duration' : '.77s',
      'animation-duration'         : '.77s'
    });
    vinyl__label.css({
      '-webkit-animation-duration' : '.77s',
      'animation-duration'         : '.77s'
    });
  });

  var svgobject = document.getElementById('p1');
  if ('contentDocument' in svgobject)
  var svgdom = svgobject.contentDocument;

  $(svgdom.getElementsByClassName("cls-1")).hover(
    function () {
      var id = $(this).attr("id");
      $("#"+id, svgdom).SVGAddClass("highlight");
    }, 
    function () {
      var id = $(this).attr("id");
      $("#"+id, svgdom).SVGRemoveClass("highlight");
    }
  );
});