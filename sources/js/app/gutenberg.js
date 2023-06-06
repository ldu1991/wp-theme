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
        window.acf.addAction('render_block_preview/type=' + type, fn)
    } else {
        document.querySelectorAll('.' + wp_ajax.prefix + '-' + type).forEach(fn)
    }
}

const initializeBlock = block => {
    block = isjQuery(block)

    let elementDirectly = block.parentNode.querySelector('.CLASS-BLOCK')

}

renderBlocks('type', initializeBlock)
