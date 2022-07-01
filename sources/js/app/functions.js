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

/**
 * Video Adaptive Resize
 * @param elements
 */
export const videoResize = elements => {
    document.querySelectorAll(elements).forEach(el => {
        el.setAttribute('style', 'position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;')

        let fnResize = () => {
            let video = el.querySelector('video')

            // Get a native video size
            let videoHeight = video.videoHeight;
            let videoWidth = video.videoWidth;

            // Get a wrapper size
            let wrapperHeight = el.offsetHeight;
            let wrapperWidth = el.offsetWidth;

            if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
                video.setAttribute('style', 'width:' + (wrapperWidth + 3) + 'px;height:auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);')
            } else {
                video.setAttribute('style', 'width:auto;height:' + (wrapperHeight + 3) + 'px;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);')
            }
        }

        fnResize();
        window.addEventListener('resize', fnResize);
    })
}

/**
 * Media Query
 * @param mediaQueryString
 * @param callback
 * @returns {boolean}
 */
export const mediaQuery = (mediaQueryString, callback) => {
    if(callback !== undefined) {
        let handleMatchMedia = mq => {
            callback(mq)
        }

        let mq = window.matchMedia(mediaQueryString)

        handleMatchMedia(mq);

        mq.addEventListener('change', handleMatchMedia);
    } else {
        return window.matchMedia(mediaQueryString).matches
    }
}
