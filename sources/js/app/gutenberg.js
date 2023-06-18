import {gsap} from "./gsap/gsap";
import {ScrollTrigger} from "./gsap/ScrollTrigger";
import {isjQuery} from "./functions";

gsap.registerPlugin(ScrollTrigger);

/**
 * Render blocks
 * @param type
 * @param fn
 */
function renderBlocks(type = '', fn) {
    if (window.acf) {
        window.acf.addAction('render_block_preview/type=' + type, el => fn(isjQuery(el).querySelector('.' + wp_ajax.prefix + '-' + type)))
    } else {
        document.querySelectorAll('.' + wp_ajax.prefix + '-' + type).forEach(fn)
    }
}

const initializeBlock = block => {

}

renderBlocks('type', initializeBlock)
