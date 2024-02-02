var fs = require("fs")
var svgRenderer = require("./index");

if(!fs.existsSync("./tests")) fs.mkdirSync("./tests");

for(var i = 10; i < 31; i++) {

    var svg = `<svg viewBox="0 0 40 40" width="40" height="40">

    <path fill="#f7f5f5" d="M 0,0 H 800 V 400 H 0 Z">
    <text y="30" x="1" fill="#1b1d35" font-weight="bolder" font-size="32">${i}</text>
    </svg>`



    var width = 400;
    var height = width;

    var png = svgRenderer.renderToPng(svg, width, height);

    fs.writeFileSync("./tests/day" + i +".png", png);
}
