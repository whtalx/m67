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