/**
 * is jQuery
 * @param obj
 * @returns {*}
 */
export const isjQuery = obj => (obj instanceof jQuery) ? obj[0] : obj;

/**
 * is Even
 * @param num
 * @returns {boolean}
 */
export const isEven = num => num % 2 === 0;

/**
 * Coordinates element
 * @param element
 * @returns {{}}
 * @constructor
 */
export const Coordinates = element => {
    if (typeof (element) === 'undefined' || element === null) {
        return
    }

    function isVisible(element) {
        let style = window.getComputedStyle(element);
        return style.display !== 'none';
    }

    function getCoordinates(element, visible) {
        let rect = {}, box, v;
        box = element.getBoundingClientRect();
        v = visible || false;

        if (v) {
            if (element.hasAttribute('data-style-attribute-coordinates')) {
                element.style.cssText = element.dataset.styleAttributeCoordinates;
                element.removeAttribute('data-style-attribute-coordinates');
            } else {
                element.removeAttribute('style');
            }
        }

        rect.element    = element;
        rect.top        = box.top;
        rect.right      = document.documentElement.clientWidth - box.right;
        rect.bottom     = document.documentElement.clientHeight - box.bottom;
        rect.left       = box.left;
        rect.width      = box.width;
        rect.height     = box.height;

        return rect;
    }

    if (!isVisible(element)) {

        if (element.hasAttribute('style')) {
            element.dataset.styleAttributeCoordinates = element.getAttribute('style');
            element.style.cssText = 'display: block; opacity: 0;' + element.getAttribute('style');
            return getCoordinates(element, true);
        } else {
            element.style.cssText = 'display: block; opacity: 0;';
            return getCoordinates(element, true);
        }

    } else {
        return getCoordinates(element);
    }
}
