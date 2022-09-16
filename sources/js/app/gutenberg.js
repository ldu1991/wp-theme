import {gsap} from "./gsap/gsap";
import {ScrollTrigger} from "./gsap/ScrollTrigger";
import {isjQuery} from "./functions";

gsap.registerPlugin(ScrollTrigger);

if (window.acf) {
    acf.add_filter('color_picker_args', function (args, field) {
        args.palettes = [
            '#1697F3',
            '#D5ECFD',
            '#8BC53F',
            '#253F53',
            '#FDC554',
            '#F3725F',
            '#FCF1E1'
        ]

        return args;
    })
}


const initializeBlock = block => {
    block = isjQuery(block)

    let elementDirectly = block.parentNode.querySelector('.CLASS-BLOCK')

}
if (window.acf) {
    window.acf.addAction('render_block_preview/type=TYPE-BLOCK', initializeBlock)
} else {
    document.querySelectorAll('.CLASS-BLOCK').forEach(initializeBlock)
}
