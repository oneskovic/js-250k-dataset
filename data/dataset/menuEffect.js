var menuEffect = (function () {

  function init() {
    var
    container = document.getElementById("system__base"),
        buttons = Array.prototype.slice.call(document.querySelectorAll(".menu--activate")),
        eventtype = "click", // touchstart
        resetMenu = function () {
          container.classList.remove("menu--opened");
        },
        bodyClickFn = function (evt) {
          if (!hasParentClass(evt.target, "system__menu")) {
            resetMenu();
            document.removeEventListener(eventtype, bodyClickFn);
          }
        };

    function hasParentClass(e, classname) {
      if (e === document) {
        return false;
      } else if (e.classList.contains(classname)) {
        return true;
      }

      return e.parentNode && hasParentClass(e.parentNode, classname);
    }

    buttons.forEach(function (el, i) {
      var effect = el.getAttribute("data-effect");

      el.addEventListener(eventtype, function (ev) {
        ev.stopPropagation();
        ev.preventDefault();

        container.className = "system__base";
        container.classList.add(effect);

        setTimeout(function () {
          container.classList.add("menu--opened");
        }, 25);

        document.addEventListener(eventtype, bodyClickFn);
      });
    });
  }

  init();

})();