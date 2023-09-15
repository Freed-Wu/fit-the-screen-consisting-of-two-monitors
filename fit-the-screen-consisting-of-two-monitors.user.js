// ==UserScript==
// @description         adapt the position of content of web page to fit the screen consisting of two monitors
// @match               *://*/*
// @name                fit the screen consisting of two monitors
// @namespace           https://github.com/Freed-Wu
// @author              Wu Zhenyu
// @version             0.0.1
// @copyright           2023, Wu Zhenyu
// @license             GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL         https://github.com/Freed-Wu/fit-the-screen-consisting-of-two-monitors
// @supportURL          https://github.com/Freed-Wu/fit-the-screen-consisting-of-two-monitors/issues
// @contributionURL     https://github.com/Freed-Wu/fit-the-screen-consisting-of-two-monitors
// ==/UserScript==

(function () {
  "use strict";

  let short_parents = new Set();
  function get_short_parents(elem) {
    if (elem.offsetWidth == 0 || elem.offsetHeight == 0) {
      return;
    }
    if (elem.offsetWidth < window.innerWidth) {
      short_parents.add(elem.parentElement);
      return;
    }
    Array.from(elem.children).forEach(function (elem) {
      get_short_parents(elem);
    });
  }
  let body = document.getElementsByTagName("body")[0];
  get_short_parents(body);

  let short_elements = new Set();
  short_parents.forEach(function (elem) {
    let min_offsetLeft = window.innerWidth;
    let short_element = null;
    Array.from(elem.children).forEach(function (elem) {
      if (
        elem.offsetHeight > 0 &&
        elem.offsetWidth > 0 &&
        elem.offsetLeft > window.innerWidth / 4 &&
        elem.offsetWidth < (2 * window.innerWidth) / 3 &&
        min_offsetLeft > elem.offsetLeft
      ) {
        min_offsetLeft = elem.offsetLeft;
        short_element = elem;
      }
    });
    if (short_element != null) {
      short_elements.add(short_element);
    }
  });

  short_elements.forEach(function (elem) {
    let default_left = "5rem";
    if (elem.offsetWidth < window.innerWidth / 4) {
      default_left = "10rem";
    }
    elem.style.marginLeft = default_left;
  });
})();
