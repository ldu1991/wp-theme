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

/**
 * Breakpoints
 * @param media
 * @param options
 * @constructor
 */
export const Breakpoints = (media, options) => {
    let defaultsOptions = {
        grid: {
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400
        },
        listenerResize: false
    }

    let originals = Object.assign({}, defaultsOptions, options);

    let grid = {}
    for (let property in originals.grid) {
        grid[property + ':min'] = originals.grid[property]
        grid[property + ':max'] = originals.grid[property] - 1
    }

    let mediaQueryString = ''
    if (media.indexOf(':min') === -1 && media.indexOf(':max') === -1) {
        mediaQueryString = media
    } else {
        let mediaQueryArr = media.split(',')
        if (mediaQueryArr.length) {
            let i = 1;
            mediaQueryArr.forEach(el => {
                if (el.trim().indexOf(':min') !== -1) {
                    mediaQueryString += '(min-width: ' + grid[el.trim()] + 'px)'

                    if (i < mediaQueryArr.length) mediaQueryString += ' and '
                } else if (el.trim().indexOf(':max') !== -1) {
                    mediaQueryString += '(max-width: ' + grid[el.trim()] + 'px)'

                    if (i < mediaQueryArr.length) mediaQueryString += ' and '
                }

                i++;
            })
        }
    }


    let handleMatchMedia = mediaQuery => {
        originals.on(mediaQuery)
    }

    let mq = window.matchMedia(mediaQueryString)

    handleMatchMedia(mq);

    if (originals.listenerResize) {
        window.addEventListener('resize', () => {
            handleMatchMedia(mq)
        })
    } else {
        mq.addEventListener('change', handleMatchMedia);
    }
}
