import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {isjQuery} from "./functions";

gsap.registerPlugin(ScrollTrigger);

let renderBlockACF = (selectors, type, initFn) => {
    if (window.acf) {
        window.acf.addAction('render_block_preview/type=' + type, initFn)
    } else {
        document.querySelectorAll(selectors).forEach(initFn)
    }
}

class Gutenberg {
    constructor() {
        renderBlockACF('.by-testimonial', 'testimonials-block-acf', this.initializeBlockHeroModule)
    }

    initializeBlockHeroModule(block) {
        block = isjQuery(block)

        console.log(block)
    }
}

export default new Gutenberg()
