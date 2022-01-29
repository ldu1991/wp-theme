import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 *
 * @param obj
 * @returns {*}
 */
let isjQuery = (obj) => {
    return (obj instanceof jQuery) ? obj[0] : obj
}

class Gutenberg {
    constructor() {
        if (window.acf) {
            window.acf.addAction('render_block_preview/type=testimonials-block-acf', this.initializeBlockHeroModule)
        } else {
            [...document.querySelectorAll('.by-testimonial')].forEach(this.initializeBlockHeroModule)
        }
    }

    initializeBlockHeroModule(block) {
        block = isjQuery(block)

        console.log(block)
    }
}

export default Gutenberg = new Gutenberg()
