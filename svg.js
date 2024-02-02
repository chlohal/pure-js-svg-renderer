var Path = require("./path");
var Text = require("./text");

/**
 * 
 * @param {import("./fake-dom").FakeDomNode} svgNode 
 */
module.exports = function Svg(svgNode) {

    var drawChildren = [];
    function traverseNodesRecursive(node) {
        for(var i = 0; i < node.childNodes.length; i++) {
            if(node.childNodes[i].nodeName.toLowerCase() == "path") drawChildren.push( node.childNodes[i].__svgRepresentation = Path(node.childNodes[i]));
            else if(node.childNodes[i].nodeName.toLowerCase() == "text") drawChildren.push( node.childNodes[i].__svgRepresentation = Text(node.childNodes[i]));
            else if(node.childNodes[i].nodeName.toLowerCase() == "g") traverseNodesRecursive(node.childNodes[i]);
            else continue;

            drawChildren[drawChildren.length - 1].node = node.childNodes[i];
        }
    }
    traverseNodesRecursive(svgNode);

    var viewBoxNumbers = (svgNode.getAttribute("viewBox") || "0 0 100 100").split(/[\s,]+/).map(x=>parseFloat(x) || 0);
    var viewBox = {
        minX: viewBoxNumbers[0],
        minY: viewBoxNumbers[1],
        width: viewBoxNumbers[2],
        height: viewBoxNumbers[3]
    };

    //function so that they are all individual objects
    function background() {
        return [255,255,255];
    }

    function getColorForPoint(svgCoordX, svgCoordY) {
        for(let k = drawChildren.length - 1; k >= 0; k--) {
            if(drawChildren[k].coversPoint(svgCoordX, svgCoordY)) {
                var color = drawChildren[k].getColor(svgCoordX, svgCoordY);
                return [color[0], color[1], color[2]];
            }
        }
        return background();
    }

    this.render = function(width, height) {
        var pixels = [];

        for(let i = 0; i < height; i++) {
            let row = [];
            for(let j = 0; j < width; j++) {
                var scaledX = viewBox.minX + (j / width)*viewBox.width,
                    scaledY = viewBox.minY + (i / height)*viewBox.height;
                
                row.push(getColorForPoint(scaledX, scaledY));                
            }
            pixels.push(row);
        }
        return pixels;
    }
}
