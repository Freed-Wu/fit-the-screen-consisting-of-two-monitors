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

  // all non-empty elements' parents
  let parents = new Set();
  function get_parents(elem) {
    // skip empty elements
    if (elem.offsetWidth || elem.offsetHeight == 0) return;
    if (elem.offsetWidth < window.innerWidth) {
      parents.add(elem.parentElement);
      return;
    }
    for (const child of elem.children) get_parents(child);
  }
  let body = document.getElementsByTagName("body")[0];
  get_parents(body);

  let elements = new Set();
  for (const parent of parents) {
    let min_offsetLeft = window.innerWidth;

    let short_element = null;
    for (const elem of parent.children) {
      // skip empty elements
      if (elem.offsetWidth || elem.offsetHeight == 0) continue;
      if (
        elem.offsetLeft > window.innerWidth / 4 &&
        elem.offsetWidth < (2 * window.innerWidth) / 3 &&
        min_offsetLeft > elem.offsetLeft
      ) {
        min_offsetLeft = elem.offsetLeft;
        short_element = elem;
      }
    }

    if (short_element != null) {
      elements.add(short_element);
    }
  }

  for (const elem of elements) {
    let default_left = "5rem";
    if (elem.offsetWidth < window.innerWidth / 4) {
      default_left = "10rem";
    }
    elem.style.marginLeft = default_left;
  }
})();
