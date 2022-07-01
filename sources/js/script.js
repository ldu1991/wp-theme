import './app/gutenberg';
import Swiper from 'swiper/swiper-bundle';
import {gsap} from "./app/gsap/gsap";
import {ScrollTrigger} from "./app/gsap/ScrollTrigger";
import {isEven, isjQuery, Coordinates, videoResize, mediaQuery} from "./app/functions";

gsap.registerPlugin(ScrollTrigger);


(function ($) {

})(jQuery);


// ------------ Deleting placeholder focus ------------ //
[...document.querySelectorAll('input, textarea')].forEach(el => {
    if (el.getAttribute('placeholder') !== null) {
        el.addEventListener('focus', (elem) => {
            elem.target.setAttribute('data-placeholder', elem.target.getAttribute('placeholder'))
            elem.target.setAttribute('placeholder', '')
        })

        el.addEventListener('blur', (elem) => {
            elem.target.setAttribute('placeholder', elem.target.getAttribute('data-placeholder'))
        })
    }
})
// ---------- End Deleting placeholder focus ---------- //

/*
let updateCategory = wp.blocks.updateCategory,
    _wp$components = wp.components,
    Path = _wp$components.Path,
    Rect = _wp$components.Rect,
    SVG = _wp$components.SVG;

if (updateCategory) {
    updateCategory('beyond-category', {
        icon: React.createElement(SVG, {
            viewBox: "0 0 90 90",
            xmlns: "http://www.w3.org/2000/svg"
        }, React.createElement(Rect, {
            x: "-0.2",
            y: "0.2",
            fill: "#DA0F26",
            width: "90",
            height: "90"
        }), React.createElement(Path, {
            fill: "#FFFFFF",
            d: "M68.6,57.8c0,10.7-6.6,19.6-21.1,19.6H22.6V38.8h22.1c9.4,0,12.7-4.8,12.7-10.6c0-5.8-2.6-10.6-12-10.6l-22.8,0.1v-7h23.2c13.3,0,19,7.8,19,17.4c0,5.4-2.6,10.2-7,13.1C64.7,44.5,68.6,50.5,68.6,57.8z M61.2,57.8c0-6.9-4.4-12.8-14.3-12.8H29.6v25.4l17.7,0.1C56.7,70.6,61.2,64.7,61.2,57.8z"
        }))
    });
}
*/
