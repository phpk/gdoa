function pptToHtml(file) {
    //'use strict';
    //console.log("file", file, "size:", file.byteLength);
    if (file.byteLength < 10) {
        console.error("file url error")
        return;
    }
    var zip = new JSZip(), s;
    //if (typeof file === 'string') { // Load
    zip = zip.load(file);  //zip.load(file, { base64: true });
    var rslt_ary = processPPTX(zip);
    //s = readXmlFile(zip, 'ppt/tableStyles.xml');
    //var slidesHeight = $("#" + divId + " .slide").height();
    for (var i = 0; i < rslt_ary.length; i++) {
        switch (rslt_ary[i]["type"]) {
            case "slide":
                $result.append(rslt_ary[i]["data"]);
                break;
            case "pptx-thumb":
                //$("#pptx-thumb").attr("src", "data:image/jpeg;base64," +rslt_ary[i]["data"]);
                break;
            case "slideSize":
                slideWidth = rslt_ary[i]["data"].width;
                slideHeight = rslt_ary[i]["data"].height;
                /*
                $("#"+divId).css({
                    'width': slideWidth + 80,
                    'height': slideHeight + 60
                });
                */
                break;
            case "globalCSS":
                //console.log(rslt_ary[i]["data"])
                $result.append("<style>" + rslt_ary[i]["data"] + "</style>");
                break;
            case "ExecutionTime":
                processMsgQueue(MsgQueue);
                setNumericBullets($(".block"));
                setNumericBullets($("table td"));

                isDone = true;

                if (settings.slideMode && !isSlideMode) {
                    isSlideMode = true;
                    initSlideMode(divId, settings);
                } else if (!settings.slideMode) {
                    $(".slides-loadnig-msg").remove();
                }
                break;
            case "progress-update":
                //console.log(rslt_ary[i]["data"]); //update progress bar - TODO
                updateProgressBar(rslt_ary[i]["data"])
                break;
            default:
        }
    }
    if (!settings.slideMode || (settings.slideMode && settings.slideType == "revealjs")) {

        if (document.getElementById("all_slides_warpper") === null) {
            $("#" + divId + " .slide").wrapAll("<div id='all_slides_warpper' class='slides'></div>");
            //$("#" + divId + " .slides").wrap("<div class='reveal'></div>");
        }

        if (settings.slideMode && settings.slideType == "revealjs") {
            $("#" + divId).addClass("reveal")
        }
    }

    var sScale = settings.slidesScale;
    var trnsfrmScl = "";
    if (sScale != "") {
        var numsScale = parseInt(sScale);
        var scaleVal = numsScale / 100;
        if (settings.slideMode && settings.slideType != "revealjs") {
            trnsfrmScl = 'transform:scale(' + scaleVal + '); transform-origin:top';
        }
    }

    var slidesHeight = $("#" + divId + " .slide").height();
    var numOfSlides = $("#" + divId + " .slide").length;
    var sScaleVal = (sScale != "") ? scaleVal : 1;
    //console.log("slidesHeight: " + slidesHeight + "\nnumOfSlides: " + numOfSlides + "\nScale: " + sScaleVal)

    $("#all_slides_warpper").attr({
        style: trnsfrmScl + ";height: " + (numOfSlides * slidesHeight * sScaleVal) + "px"
    })

    //}
}

function processPPTX(zip) {
    var post_ary = [];
    var dateBefore = new Date();

    if (zip.file("docProps/thumbnail.jpeg") !== null) {
        var pptxThumbImg = base64ArrayBuffer(zip.file("docProps/thumbnail.jpeg").asArrayBuffer());
        post_ary.push({
            "type": "pptx-thumb",
            "data": pptxThumbImg,
            "slide_num": -1
        });
    }

    var filesInfo = getContentTypes(zip);
    var slideSize = getSlideSizeAndSetDefaultTextStyle(zip);
    tableStyles = readXmlFile(zip, "ppt/tableStyles.xml");
    //console.log("slideSize: ", slideSize)
    post_ary.push({
        "type": "slideSize",
        "data": slideSize,
        "slide_num": 0
    });

    var numOfSlides = filesInfo["slides"].length;
    for (var i = 0; i < numOfSlides; i++) {
        var filename = filesInfo["slides"][i];
        var filename_no_path = "";
        var filename_no_path_ary = [];
        if (filename.indexOf("/") != -1) {
            filename_no_path_ary = filename.split("/");
            filename_no_path = filename_no_path_ary.pop();
        } else {
            filename_no_path = filename;
        }
        var filename_no_path_no_ext = "";
        if (filename_no_path.indexOf(".") != -1) {
            var filename_no_path_no_ext_ary = filename_no_path.split(".");
            var slide_ext = filename_no_path_no_ext_ary.pop();
            filename_no_path_no_ext = filename_no_path_no_ext_ary.join(".");
        }
        var slide_number = 1;
        if (filename_no_path_no_ext != "" && filename_no_path.indexOf("slide") != -1) {
            slide_number = Number(filename_no_path_no_ext.substr(5));
        }
        var slideHtml = processSingleSlide(zip, filename, i, slideSize);
        post_ary.push({
            "type": "slide",
            "data": slideHtml,
            "slide_num": slide_number,
            "file_name": filename_no_path_no_ext
        });
        post_ary.push({
            "type": "progress-update",
            "slide_num": (numOfSlides + i + 1),
            "data": (i + 1) * 100 / numOfSlides
        });
    }

    post_ary.sort(function (a, b) {
        return a.slide_num - b.slide_num;
    });

    post_ary.push({
        "type": "globalCSS",
        "data": genGlobalCSS()
    });

    var dateAfter = new Date();
    post_ary.push({
        "type": "ExecutionTime",
        "data": dateAfter - dateBefore
    });
    return post_ary;
}
function getContentTypes(zip) {
    var ContentTypesJson = readXmlFile(zip, "[Content_Types].xml");

    var subObj = ContentTypesJson["Types"]["Override"];
    var slidesLocArray = [];
    var slideLayoutsLocArray = [];
    for (var i = 0; i < subObj.length; i++) {
        switch (subObj[i]["attrs"]["ContentType"]) {
            case "application/vnd.openxmlformats-officedocument.presentationml.slide+xml":
                slidesLocArray.push(subObj[i]["attrs"]["PartName"].substr(1));
                break;
            case "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml":
                slideLayoutsLocArray.push(subObj[i]["attrs"]["PartName"].substr(1));
                break;
            default:
        }
    }
    return {
        "slides": slidesLocArray,
        "slideLayouts": slideLayoutsLocArray
    };
}

function readXmlFile(zip, filename, isSlideContent) {
    try {
        var fileContent = zip.file(filename).asText();
        if (isSlideContent && app_verssion <= 12) {
            //< office2007
            //remove "<![CDATA[ ... ]]>" tag
            fileContent = fileContent.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
        }
        var xmlData = tXml(fileContent, { simplify: 1 });
        if (xmlData["?xml"] !== undefined) {
            return xmlData["?xml"];
        } else {
            return xmlData;
        }
    } catch (e) {
        //console.log("error readXmlFile: the file '", filename, "' not exit")
        return null;
    }

}
function getSlideSizeAndSetDefaultTextStyle(zip) {
    //get app version
    var app = readXmlFile(zip, "docProps/app.xml");
    var app_verssion_str = app["Properties"]["AppVersion"]
    app_verssion = parseInt(app_verssion_str);
    console.log("create by Office PowerPoint app verssion: ", app_verssion_str)

    //get slide dimensions
    var rtenObj = {};
    var content = readXmlFile(zip, "ppt/presentation.xml");
    var sldSzAttrs = content["p:presentation"]["p:sldSz"]["attrs"];
    var sldSzWidth = parseInt(sldSzAttrs["cx"]);
    var sldSzHeight = parseInt(sldSzAttrs["cy"]);
    var sldSzType = sldSzAttrs["type"];
    //console.log("Presentation size type: ", sldSzType)

    defaultTextStyle = content["p:presentation"]["p:defaultTextStyle"];

    slideWidth = sldSzWidth * slideFactor + settings.incSlide.width | 0;// * scaleX;//parseInt(sldSzAttrs["cx"]) * 96 / 914400;
    slideHeight = sldSzHeight * slideFactor + settings.incSlide.height | 0;// * scaleY;//parseInt(sldSzAttrs["cy"]) * 96 / 914400;
    rtenObj = {
        "width": slideWidth,
        "height": slideHeight
    };
    return rtenObj;
}

function processSingleSlide(zip, sldFileName, index, slideSize) {
    /*
    self.postMessage({
        "type": "INFO",
        "data": "Processing slide" + (index + 1)
    });
    */
    // =====< Step 1 >=====
    // Read relationship filename of the slide (Get slideLayoutXX.xml)
    // @sldFileName: ppt/slides/slide1.xml
    // @resName: ppt/slides/_rels/slide1.xml.rels
    var resName = sldFileName.replace("slides/slide", "slides/_rels/slide") + ".rels";
    var resContent = readXmlFile(zip, resName);
    var RelationshipArray = resContent["Relationships"]["Relationship"];
    //console.log("RelationshipArray: " , RelationshipArray)
    var layoutFilename = "";
    var diagramFilename = "";
    var slideResObj = {};
    if (RelationshipArray.constructor === Array) {
        for (var i = 0; i < RelationshipArray.length; i++) {
            switch (RelationshipArray[i]["attrs"]["Type"]) {
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout":
                    layoutFilename = RelationshipArray[i]["attrs"]["Target"].replace("../", "ppt/");
                    break;
                case "http://schemas.microsoft.com/office/2007/relationships/diagramDrawing":
                    diagramFilename = RelationshipArray[i]["attrs"]["Target"].replace("../", "ppt/");
                    slideResObj[RelationshipArray[i]["attrs"]["Id"]] = {
                        "type": RelationshipArray[i]["attrs"]["Type"].replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""),
                        "target": RelationshipArray[i]["attrs"]["Target"].replace("../", "ppt/")
                    };
                    break;
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide":
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart":
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink":
                default:
                    slideResObj[RelationshipArray[i]["attrs"]["Id"]] = {
                        "type": RelationshipArray[i]["attrs"]["Type"].replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""),
                        "target": RelationshipArray[i]["attrs"]["Target"].replace("../", "ppt/")
                    };
            }
        }
    } else {
        layoutFilename = RelationshipArray["attrs"]["Target"].replace("../", "ppt/");
    }
    //console.log(slideResObj);
    // Open slideLayoutXX.xml
    var slideLayoutContent = readXmlFile(zip, layoutFilename);
    var slideLayoutTables = indexNodes(slideLayoutContent);
    var sldLayoutClrOvr = getTextByPathList(slideLayoutContent, ["p:sldLayout", "p:clrMapOvr", "a:overrideClrMapping"]);

    //console.log(slideLayoutClrOvride);
    if (sldLayoutClrOvr !== undefined) {
        slideLayoutClrOvride = sldLayoutClrOvr["attrs"];
    }
    // =====< Step 2 >=====
    // Read slide master filename of the slidelayout (Get slideMasterXX.xml)
    // @resName: ppt/slideLayouts/slideLayout1.xml
    // @masterName: ppt/slideLayouts/_rels/slideLayout1.xml.rels
    var slideLayoutResFilename = layoutFilename.replace("slideLayouts/slideLayout", "slideLayouts/_rels/slideLayout") + ".rels";
    var slideLayoutResContent = readXmlFile(zip, slideLayoutResFilename);
    RelationshipArray = slideLayoutResContent["Relationships"]["Relationship"];
    var masterFilename = "";
    var layoutResObj = {};
    if (RelationshipArray.constructor === Array) {
        for (var i = 0; i < RelationshipArray.length; i++) {
            switch (RelationshipArray[i]["attrs"]["Type"]) {
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster":
                    masterFilename = RelationshipArray[i]["attrs"]["Target"].replace("../", "ppt/");
                    break;
                default:
                    layoutResObj[RelationshipArray[i]["attrs"]["Id"]] = {
                        "type": RelationshipArray[i]["attrs"]["Type"].replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""),
                        "target": RelationshipArray[i]["attrs"]["Target"].replace("../", "ppt/")
                    };
            }
        }
    } else {
        masterFilename = RelationshipArray["attrs"]["Target"].replace("../", "ppt/");
    }
    // Open slideMasterXX.xml
    var slideMasterContent = readXmlFile(zip, masterFilename);
    var slideMasterTextStyles = getTextByPathList(slideMasterContent, ["p:sldMaster", "p:txStyles"]);
    var slideMasterTables = indexNodes(slideMasterContent);

    /////////////////Amir/////////////
    //Open slideMasterXX.xml.rels
    var slideMasterResFilename = masterFilename.replace("slideMasters/slideMaster", "slideMasters/_rels/slideMaster") + ".rels";
    var slideMasterResContent = readXmlFile(zip, slideMasterResFilename);
    RelationshipArray = slideMasterResContent["Relationships"]["Relationship"];
    var themeFilename = "";
    var masterResObj = {};
    if (RelationshipArray.constructor === Array) {
        for (var i = 0; i < RelationshipArray.length; i++) {
            switch (RelationshipArray[i]["attrs"]["Type"]) {
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme":
                    themeFilename = RelationshipArray[i]["attrs"]["Target"].replace("../", "ppt/");
                    break;
                default:
                    masterResObj[RelationshipArray[i]["attrs"]["Id"]] = {
                        "type": RelationshipArray[i]["attrs"]["Type"].replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""),
                        "target": RelationshipArray[i]["attrs"]["Target"].replace("../", "ppt/")
                    };
            }
        }
    } else {
        themeFilename = RelationshipArray["attrs"]["Target"].replace("../", "ppt/");
    }
    //console.log(themeFilename)
    //Load Theme file
    var themeResObj = {};
    if (themeFilename !== undefined) {
        var themeName = themeFilename.split("/").pop();
        var themeResFileName = themeFilename.replace(themeName, "_rels/" + themeName) + ".rels";
        //console.log("themeFilename: ", themeFilename, ", themeName: ", themeName, ", themeResFileName: ", themeResFileName)
        var themeContent = readXmlFile(zip, themeFilename);
        var themeResContent = readXmlFile(zip, themeResFileName);
        if (themeResContent !== null) {
            var relationshipArray = themeResContent["Relationships"]["Relationship"];
            if (relationshipArray !== undefined) {
                var themeFilename = "";
                if (relationshipArray.constructor === Array) {
                    for (var i = 0; i < relationshipArray.length; i++) {
                        themeResObj[relationshipArray[i]["attrs"]["Id"]] = {
                            "type": relationshipArray[i]["attrs"]["Type"].replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""),
                            "target": relationshipArray[i]["attrs"]["Target"].replace("../", "ppt/")
                        };
                    }
                } else {
                    //console.log("theme relationshipArray : ", relationshipArray)
                    themeResObj[relationshipArray["attrs"]["Id"]] = {
                        "type": relationshipArray["attrs"]["Type"].replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""),
                        "target": relationshipArray["attrs"]["Target"].replace("../", "ppt/")
                    };
                }
            }
        }
    }
    //Load diagram file
    var diagramResObj = {};
    var digramFileContent = {};
    if (diagramFilename !== undefined) {
        var diagName = diagramFilename.split("/").pop();
        var diagramResFileName = diagramFilename.replace(diagName, "_rels/" + diagName) + ".rels";
        //console.log("diagramFilename: ", diagramFilename, ", themeName: ", themeName, ", diagramResFileName: ", diagramResFileName)
        digramFileContent = readXmlFile(zip, diagramFilename);
        if (digramFileContent !== null && digramFileContent !== undefined && digramFileContent != "") {
            var digramFileContentObjToStr = JSON.stringify(digramFileContent);
            digramFileContentObjToStr = digramFileContentObjToStr.replace(/dsp:/g, "p:");
            digramFileContent = JSON.parse(digramFileContentObjToStr);
        }

        var digramResContent = readXmlFile(zip, diagramResFileName);
        if (digramResContent !== null) {
            var relationshipArray = digramResContent["Relationships"]["Relationship"];
            var themeFilename = "";
            if (relationshipArray.constructor === Array) {
                for (var i = 0; i < relationshipArray.length; i++) {
                    diagramResObj[relationshipArray[i]["attrs"]["Id"]] = {
                        "type": relationshipArray[i]["attrs"]["Type"].replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""),
                        "target": relationshipArray[i]["attrs"]["Target"].replace("../", "ppt/")
                    };
                }
            } else {
                //console.log("theme relationshipArray : ", relationshipArray)
                diagramResObj[relationshipArray["attrs"]["Id"]] = {
                    "type": relationshipArray["attrs"]["Type"].replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""),
                    "target": relationshipArray["attrs"]["Target"].replace("../", "ppt/")
                };
            }
        }
    }
    //console.log("diagramResObj: " , diagramResObj)
    // =====< Step 3 >=====
    var slideContent = readXmlFile(zip, sldFileName, true);
    var nodes = slideContent["p:sld"]["p:cSld"]["p:spTree"];
    var warpObj = {
        "zip": zip,
        "slideLayoutContent": slideLayoutContent,
        "slideLayoutTables": slideLayoutTables,
        "slideMasterContent": slideMasterContent,
        "slideMasterTables": slideMasterTables,
        "slideContent": slideContent,
        "slideResObj": slideResObj,
        "slideMasterTextStyles": slideMasterTextStyles,
        "layoutResObj": layoutResObj,
        "masterResObj": masterResObj,
        "themeContent": themeContent,
        "themeResObj": themeResObj,
        "digramFileContent": digramFileContent,
        "diagramResObj": diagramResObj,
        "defaultTextStyle": defaultTextStyle
    };
    var bgResult = "";
    if (processFullTheme === true) {
        bgResult = getBackground(warpObj, slideSize, index);
    }

    var bgColor = "";
    if (processFullTheme == "colorsAndImageOnly") {
        bgColor = getSlideBackgroundFill(warpObj, index);
    }

    if (settings.slideMode && settings.slideType == "revealjs") {
        var result = "<section class='slide' style='width:" + slideSize.width + "px; height:" + slideSize.height + "px;" + bgColor + "'>"
    } else {
        var result = "<div class='slide' style='width:" + slideSize.width + "px; height:" + slideSize.height + "px;" + bgColor + "'>"
    }
    result += bgResult;
    for (var nodeKey in nodes) {
        if (nodes[nodeKey].constructor === Array) {
            for (var i = 0; i < nodes[nodeKey].length; i++) {
                result += processNodesInSlide(nodeKey, nodes[nodeKey][i], nodes, warpObj, "slide");
            }
        } else {
            result += processNodesInSlide(nodeKey, nodes[nodeKey], nodes, warpObj, "slide");
        }
    }
    if (settings.slideMode && settings.slideType == "revealjs") {
        return result + "</div></section>";
    } else {
        return result + "</div></div>";
    }

}