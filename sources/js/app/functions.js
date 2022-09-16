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

        rect.element = element;
        rect.top = box.top;
        rect.right = document.documentElement.clientWidth - box.right;
        rect.bottom = document.documentElement.clientHeight - box.bottom;
        rect.left = box.left;
        rect.width = box.width;
        rect.height = box.height;

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

/**
 * Video Adaptive Resize
 * @param elements
 * @param className
 */
export const videoResize = (elements, className) => {
    function wrapperVideo(parent, className) {
        const wrapper = document.createElement('div');
        if(className !== undefined) wrapper.classList = className;
        wrapper.setAttribute('style', 'position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;')

        parent.parentNode.insertBefore(wrapper, parent);
        wrapper.appendChild(parent);
    }

    document.querySelectorAll(elements).forEach(el => {
        wrapperVideo(el, className)

        let fnResize = () => {
            // Get a native video size
            let videoHeight = el.videoHeight;
            let videoWidth = el.videoWidth;

            // Get a wrapper size
            let wrapperHeight = el.parentNode.offsetHeight;
            let wrapperWidth = el.parentNode.offsetWidth;

            if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
                el.setAttribute('style', 'width:' + (wrapperWidth + 3) + 'px;height:auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);')
            } else {
                el.setAttribute('style', 'width:auto;height:' + (wrapperHeight + 3) + 'px;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);')
            }
        }

        fnResize();
        window.addEventListener('resize', fnResize);
    })
}

// ------------ Deleting placeholder focus ------------ //
function focusFnInput(target, event) {
    if (target.getAttribute('placeholder') !== null) {
        target.setAttribute('data-placeholder', target.getAttribute('placeholder'))
        target.setAttribute('placeholder', '')
    }
}

document.addEventListener('focus', function (event) {
    for (let target = event.target; target && target !== this; target = target.parentNode) {
        if (target.matches('input, textarea')) {
            focusFnInput.call(this, target, event)
            break;
        }
    }
}, true);

function blurFnInput(target, event) {
    if (target.getAttribute('data-placeholder') !== null) {
        target.setAttribute('placeholder', target.getAttribute('data-placeholder'))
    }
}

document.addEventListener('blur', function (event) {
    for (let target = event.target; target && target !== this; target = target.parentNode) {
        if (target.matches('input, textarea')) {
            blurFnInput.call(this, target, event)
            break;
        }
    }
}, true);
// ---------- End Deleting placeholder focus ---------- //
