var fakeDOM = require("./fake-dom");
var PngFile = require("./png-file/png-file.js");
var Svg = require("./svg.js");

function parseSvg(svg) {
    if(typeof svg !== "string") throw new Error("When parsing an SVG, it must be a string.");

    //return the first SVG element in the document
    return fakeDOM.parseHTML(svg).find(e=>e.nodeName === "SVG");
}

function renderToPixels(svg, width, height) {
    if(typeof svg === "string") svg = parseSvg(svg);

    return (new Svg(svg)).render(width, height);
}

module.exports = {
    fakeDOM, parseSvg, renderToPixels,
    renderToPng: function(svg, width, height) {
        return new PngFile(renderToPixels(svg, width, height), width).toBuffer()
    }
}