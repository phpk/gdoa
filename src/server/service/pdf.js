const path = require('path');
const fs = require('fs');
const rename = think.promisify(fs.rename, fs);
//const pdfreader = require('pdfreader');
// HACK few hacks to let PDF.js be loaded not as a module in global space.
require("./pdf/domstubs.js").setStubs(global);
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const { document } = require('./pdf/domstubs.js');
const CMAP_URL = think.ROOT_PATH + "node_modules/pdfjs-dist/cmaps/";
const STANDARD_FONT_DATA_URL = think.ROOT_PATH + "node_modules/pdfjs-dist/standard_fonts/";
const CMAP_PACKED = true;
const SVG_NS = "http://www.w3.org/2000/svg";
const Canvas = require("canvas");

function NodeCanvasFactory() { }
NodeCanvasFactory.prototype = {
    create: function NodeCanvasFactory_create(width, height) {
        const canvas = Canvas.createCanvas(width, height);
        const context = canvas.getContext("2d");
        return {
            canvas,
            context,
        };
    },

    reset: function NodeCanvasFactory_reset(canvasAndContext, width, height) {
        canvasAndContext.canvas.width = width;
        canvasAndContext.canvas.height = height;
    },

    destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
        // Zeroing the width and height cause Firefox to release graphics
        // resources immediately, which can greatly reduce memory consumption.
        canvasAndContext.canvas.width = 0;
        canvasAndContext.canvas.height = 0;
        canvasAndContext.canvas = null;
        canvasAndContext.context = null;
    },
};

module.exports = class extends think.Service {
    async readSvg(pdfPath) {
        let data = new Uint8Array(fs.readFileSync(pdfPath));
        let loadingTask = pdfjsLib.getDocument({
            data,
            cMapUrl: CMAP_URL,
            cMapPacked: CMAP_PACKED,
            fontExtraProperties: true,
        });
        let doc = await loadingTask.promise;
        let numPages = doc.numPages;
        let res = [], that = this;
        //let rtdom = document.createElement('div');
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            try {
                let page = await doc.getPage(pageNum);
                let viewport = page.getViewport({ scale: 1.0 });
                /*
                let opList = await page.getOperatorList();
                let svgGfx = new pdfjsLib.SVGGraphics(
                    page.commonObjs,
                    page.objs,
                    true
                );
                svgGfx.embedFonts = true;
                let svg = await svgGfx.getSVG(opList, viewport);
                //await writeSvgToFile(svg, getFilePathForPage(pageNum));
                // Release page resources.
                
                //let textContent = await page.getTextContent();
                // building SVG and adding that to the DOM
                //let svg = that.buildSVG(viewport, textContent);
                */
                const canvasFactory = new NodeCanvasFactory();
                const canvasAndContext = canvasFactory.create(
                    viewport.width,
                    viewport.height
                );
                const renderContext = {
                    canvasContext: canvasAndContext.context,
                    viewport,
                    canvasFactory,
                };

                const renderTask = page.render(renderContext);
                await renderTask.promise;
                // Convert the canvas to an image buffer.
                //const image = canvasAndContext.canvas.toBuffer();
                let image = canvasAndContext.canvas.toDataURL('image/png');
                page.cleanup();
                //res.push(svg.toString());
                res.push('<img src="' + image + '">');
                //let sfile = path.join(think.ROOT_PATH, 'www/upload/word/' + pageNum + '.png');
                //fs.writeFileSync(sfile, image)
                //rtdom.appendChild(svg)

            } catch (err) {
                console.log(`Error: ${err.message}`);
                //return false;
            }
        }
        return res.join('');
    }
    async toText3(file) {
        let now = Date.now(),
            fpath = 'www/upload/word/cache/',
            pdfPath = path.join(think.ROOT_PATH, fpath + now + ".pdf");
        think.mkdir(path.dirname(pdfPath));
        await rename(file.path, pdfPath);
        const pdf = require('pdf-parse');
        
        let dataBuffer = fs.readFileSync(pdfPath);
        
        let res = await pdf(dataBuffer)
        console.log(res)
        return {value : res.text};
    }
    async toText(file) {
        let now = Date.now(),
            fpath = 'www/upload/word/cache/',
            pdfPath = path.join(think.ROOT_PATH, fpath + now + ".pdf");
        think.mkdir(path.dirname(pdfPath));
        await rename(file.path, pdfPath);
        const pdfData = {
            metadata: '',
            textContent: [],
            styles: {}
        }
        const loadingTask = await pdfjsLib.getDocument(pdfPath)
        const doc = await loadingTask.promise
        pdfData.metadata = await doc.getMetadata()
        const numPages = doc.numPages
        for (let i = 1; i <= numPages; i++) {
            const page = await doc.getPage(i)
            const txtContent = await page.getTextContent()
            pdfData.textContent = pdfData.textContent.concat(txtContent.items)
            for (const [key, value] of Object.entries(txtContent.styles)) {
                pdfData.styles[key] = value
            }
        }
        return pdfData.textContent
    }
    /*
    async readlines(filepath, xwidth) {
        return new Promise((resolve, reject) => {
            var pdftxt = new Array();
            var pg = 0;
            new pdfreader.PdfReader().parseFileItems(filepath, function (err, item) {
                if (err) console.log("pdf reader error: " + err);
                else if (!item) {
                    pdftxt.forEach(function (a, idx) {
                        pdftxt[idx].forEach(function (v, i) {
                            pdftxt[idx][i].splice(1, 2);
                        });
                    });
                    resolve(pdftxt);
                } else if (item && item.page) {
                    pg = item.page - 1;
                    pdftxt[pg] = [];
                } else if (item.text) {
                    var t = 0;
                    var sp = "";
                    pdftxt[pg].forEach(function (val, idx) {
                        if (val[1] == item.y) {
                            if (xwidth && item.x - val[2] > xwidth) {
                                sp += " ";
                            } else {
                                sp = "";
                            }
                            pdftxt[pg][idx][0] += sp + item.text;
                            t = 1;
                        }
                    });
                    if (t == 0) {
                        pdftxt[pg].push([item.text, item.y, item.x]);
                    }
                }
            });
        });
    }
    async toText2(file) {
        let now = Date.now(),
            fpath = 'www/upload/word/cache/',
            pdfpath = path.join(think.ROOT_PATH, fpath + now + ".pdf");

        think.mkdir(path.dirname(pdfpath));
        await rename(file.path, pdfpath);
        let res = await this.readlines(pdfpath);
        console.log(res)
        return res;

    }
    */
    /*
    buildSVG(viewport, textContent) {
        // Building SVG with size of the viewport (for simplicity)
        const svg = document.createElementNS(SVG_NS, "svg:svg");
        svg.setAttribute("width", viewport.width + "px");
        svg.setAttribute("height", viewport.height + "px");
        // items are transformed to have 1px font size
        svg.setAttribute("font-size", 1);
      
        // processing all items
        textContent.items.forEach(function (textItem) {
          // we have to take in account viewport transform, which includes scale,
          // rotation and Y-axis flip, and not forgetting to flip text.
          const tx = pdfjsLib.Util.transform(
            pdfjsLib.Util.transform(viewport.transform, textItem.transform),
            [1, 0, 0, -1, 0, 0]
          );
          const style = textContent.styles[textItem.fontName];
          // adding text element
          const text = document.createElementNS(SVG_NS, "svg:text");
          text.setAttribute("transform", "matrix(" + tx.join(" ") + ")");
          text.setAttribute("font-family", style.fontFamily);
          text.textContent = textItem.str;
          //console.log(textItem.str)
          svg.appendChild(text);
        });
        return svg;
      }*/
}