/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */

/**
 * Equation of a line.
 */

document.documentElement.className="js";var supportsCssVars=function(){var e,t=document.createElement("style");return t.innerHTML="root: { --tmp-var: bold; }",document.head.appendChild(t),e=!!(window.CSS&&window.CSS.supports&&window.CSS.supports("font-weight","var(--tmp-var)")),t.parentNode.removeChild(t),e};supportsCssVars()||alert("Please view this demo in a modern browser that supports CSS Variables.");
 

const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b 
    var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
    return m * currentVal + b;
};

const distanceThreshold = {min: 0, max: 100};


/**************** Button ****************/
const bttn = document.querySelector('.fxButton--border');
const bttnBorder = bttn.querySelector('.fxButton__border');
const borderInterval = {from: 0.1, to: 1};

const bttnGraphic = bttn.querySelector('.fxButton__graphic');
const bttnText = bttn.querySelector('.fxButton__text');
const graphicInterval = {from: 60, to: 0};
const textInterval = {from: 0, to: -20};

new Nearby(bttn, {
    onProgress: (distance) => {
        const border = lineEq(borderInterval.from, borderInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnBorder, 0.5, {
            ease: 'Expo.easeOut',
            opacity: `${Math.max(Math.min(border,borderInterval.to),borderInterval.from)}`
        });

        const tx = lineEq(graphicInterval.from, graphicInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnGraphic, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(tx,graphicInterval.from)}`
        });

        const txText = lineEq(textInterval.from, textInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnText, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(txText,graphicInterval.to)}`,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});

/**************** Button two ****************/
const bttntwo = document.querySelector('.fxButton--border.two');
const bttnBordertwo = bttntwo.querySelector('.fxButton__border.two');
const borderIntervaltwo = {from: 0.1, to: 1};

const bttnGraphictwo = bttntwo.querySelector('.fxButton__graphic.two');
const bttnTexttwo = bttntwo.querySelector('.fxButton__text.two');
const graphicIntervaltwo = {from: 60, to: 0};
const textIntervaltwo = {from: 0, to: -20};

new Nearby(bttntwo, {
    onProgress: (distance) => {
        const border = lineEq(borderIntervaltwo.from, borderIntervaltwo.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnBordertwo, 0.5, {
            ease: 'Expo.easeOut',
            opacity: `${Math.max(Math.min(border,borderIntervaltwo.to),borderIntervaltwo.from)}`
        });

        const tx = lineEq(graphicIntervaltwo.from, graphicIntervaltwo.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnGraphictwo, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(tx,graphicInterval.from)}`
        });

        const txText = lineEq(textIntervaltwo.from, textIntervaltwo.to, distanceThreshold.max, distanceThreshold.min, distance);
        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnTexttwo, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(txText,graphicIntervaltwo.to)}`,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});

/**************** Button three ****************/
const bttnthree = document.querySelector('.fxButton--border.three');
const bttnBorderthree = bttnthree.querySelector('.fxButton__border.three');
const borderIntervalthree = {from: 0.1, to: 1};

const bttnGraphicthree = bttnthree.querySelector('.fxButton__graphic.three');
const bttnTextthree = bttnthree.querySelector('.fxButton__text.three');
const graphicIntervalthree = {from: 60, to: 0};
const textIntervalthree = {from: 0, to: -20};

new Nearby(bttnthree, {
    onProgress: (distance) => {
        const border = lineEq(borderIntervalthree.from, borderIntervalthree.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnBorderthree, 0.5, {
            ease: 'Expo.easeOut',
            opacity: `${Math.max(Math.min(border,borderIntervalthree.to),borderIntervalthree.from)}`
        });

        const tx = lineEq(graphicIntervalthree.from, graphicIntervalthree.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnGraphicthree, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(tx,graphicInterval.from)}`
        });

        const txText = lineEq(textIntervalthree.from, textIntervalthree.to, distanceThreshold.max, distanceThreshold.min, distance);
        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnTextthree, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(txText,graphicIntervalthree.to)}`,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});

/**************** Button four ****************/
const bttnfour = document.querySelector('.fxButton--border.four');
const bttnBorderfour = bttnfour.querySelector('.fxButton__border.four');
const borderIntervalfour = {from: 0.1, to: 1};

const bttnGraphicfour = bttnfour.querySelector('.fxButton__graphic.four');
const bttnTextfour = bttnfour.querySelector('.fxButton__text.four');
const graphicIntervalfour = {from: 60, to: 0};
const textIntervalfour = {from: 0, to: -20};

new Nearby(bttnfour, {
    onProgress: (distance) => {
        const border = lineEq(borderIntervalfour.from, borderIntervalfour.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnBorderfour, 0.5, {
            ease: 'Expo.easeOut',
            opacity: `${Math.max(Math.min(border,borderIntervalfour.to),borderIntervalfour.from)}`
        });

        const tx = lineEq(graphicIntervalfour.from, graphicIntervalfour.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnGraphicfour, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(tx,graphicInterval.from)}`
        });

        const txText = lineEq(textIntervalfour.from, textIntervalfour.to, distanceThreshold.max, distanceThreshold.min, distance);
        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnTextfour, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(txText,graphicIntervalfour.to)}`,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});

/**************** Button five ****************/
const bttnfive = document.querySelector('.fxButton--border.five');
const bttnBorderfive = bttnfive.querySelector('.fxButton__border.five');
const borderIntervalfive = {from: 0.1, to: 1};

const bttnGraphicfive = bttnfive.querySelector('.fxButton__graphic.five');
const bttnTextfive = bttnfive.querySelector('.fxButton__text.five');
const graphicIntervalfive = {from: 60, to: 0};
const textIntervalfive = {from: 0, to: -20};

new Nearby(bttnfive, {
    onProgress: (distance) => {
        const border = lineEq(borderIntervalfive.from, borderIntervalfive.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnBorderfive, 0.5, {
            ease: 'Expo.easeOut',
            opacity: `${Math.max(Math.min(border,borderIntervalfive.to),borderIntervalfive.from)}`
        });

        const tx = lineEq(graphicIntervalfive.from, graphicIntervalfive.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnGraphicfive, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(tx,graphicInterval.from)}`
        });

        const txText = lineEq(textIntervalfive.from, textIntervalfive.to, distanceThreshold.max, distanceThreshold.min, distance);
        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnTextfive, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(txText,graphicIntervalfive.to)}`,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});

/**************** Button six ****************/
const bttnsix = document.querySelector('.fxButton--border.six');
const bttnBordersix = bttnsix.querySelector('.fxButton__border.six');
const borderIntervalsix = {from: 0.1, to: 1};

const bttnGraphicsix = bttnsix.querySelector('.fxButton__graphic.six');
const bttnTextsix = bttnsix.querySelector('.fxButton__text.six');
const graphicIntervalsix = {from: 60, to: 0};
const textIntervalsix = {from: 0, to: -20};

new Nearby(bttnsix, {
    onProgress: (distance) => {
        const border = lineEq(borderIntervalsix.from, borderIntervalsix.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnBordersix, 0.5, {
            ease: 'Expo.easeOut',
            opacity: `${Math.max(Math.min(border,borderIntervalsix.to),borderIntervalsix.from)}`
        });

        const tx = lineEq(graphicIntervalsix.from, graphicIntervalsix.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnGraphicsix, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(tx,graphicInterval.from)}`
        });

        const txText = lineEq(textIntervalsix.from, textIntervalsix.to, distanceThreshold.max, distanceThreshold.min, distance);
        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnTextsix, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(txText,graphicIntervalsix.to)}`,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});

/**************** Button seven ****************/
const bttnseven = document.querySelector('.fxButton--border.seven');
const bttnBorderseven = bttnseven.querySelector('.fxButton__border.seven');
const borderIntervalseven = {from: 0.1, to: 1};

const bttnGraphicseven = bttnseven.querySelector('.fxButton__graphic.seven');
const bttnTextseven = bttnseven.querySelector('.fxButton__text.seven');
const graphicIntervalseven = {from: 60, to: 0};
const textIntervalseven = {from: 0, to: -20};

new Nearby(bttnseven, {
    onProgress: (distance) => {
        const border = lineEq(borderIntervalseven.from, borderIntervalseven.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnBorderseven, 0.5, {
            ease: 'Expo.easeOut',
            opacity: `${Math.max(Math.min(border,borderIntervalseven.to),borderIntervalseven.from)}`
        });

        const tx = lineEq(graphicIntervalseven.from, graphicIntervalseven.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnGraphicseven, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(tx,graphicInterval.from)}`
        });

        const txText = lineEq(textIntervalseven.from, textIntervalseven.to, distanceThreshold.max, distanceThreshold.min, distance);
        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnTextseven, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(txText,graphicIntervalseven.to)}`,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});