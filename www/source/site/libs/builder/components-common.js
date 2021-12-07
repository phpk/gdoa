/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/Vvvebjs
*/

bgcolorClasses = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-light", "bg-dark", "bg-white"]

bgcolorSelectOptions = 
[{
	value: "Default",
	text: ""
}, 
{
	value: "bg-primary",
	text: "Primary"
}, {
	value: "bg-secondary",
	text: "Secondary"
}, {
	value: "bg-success",
	text: "Success"
}, {
	value: "bg-danger",
	text: "Danger"
}, {
	value: "bg-warning",
	text: "Warning"
}, {
	value: "bg-info",
	text: "Info"
}, {
	value: "bg-light",
	text: "Light"
}, {
	value: "bg-dark",
	text: "Dark"
}, {
	value: "bg-white",
	text: "White"
}];

function changeNodeName(node, newNodeName)
{
	var newNode;
	newNode = document.createElement(newNodeName);
	attributes = node.get(0).attributes;
	
	for (i = 0, len = attributes.length; i < len; i++) {
		newNode.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
	}

	$(newNode).append($(node).contents());
	$(node).replaceWith(newNode);
	
	return newNode;
}

var base_sort = 100;//start sorting for base component from 100 to allow extended properties to be first
var style_section = 'style';

Vvveb.Components.add("_base", {
    name: "Element",
	properties: [{
        key: "element_header",
        inputtype: SectionInput,
        name:false,
        sort:base_sort++,
        data: {header:"General"},
    }, {
        name: "Id",
        key: "id",
        htmlAttr: "id",
        sort: base_sort++,
        inline:false,
        col:6,
        inputtype: TextInput
    }, {
        name: "Class",
        key: "class",
        htmlAttr: "class",
        sort: base_sort++,
        inline:false,
        col:6,
        inputtype: TextInput
    }
   ]
});    

//display
Vvveb.Components.extend("_base", "_base", {
	 properties: [
	 {
        key: "display_header",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		section: style_section,
        data: {header:"Display"},
     }, {
	key: "linked_styles_check",
        sort: base_sort++,
        section: style_section,
        inline:false,
        col:12,
        inputtype: NoticeInput,
        data: {
			type:'warning',
			title:'Linked styles',
			text:'This element shares styles with other <a class="linked-elements-hover" href="#"><b class="elements-count">4</b> elements</a>, to apply styles <b>only for this element</b> enter a <b>unique id</b> eg: <i>marketing-heading</i> in in <br/><a class="id-input" href="#content-tab" role="tab" aria-controls="components" aria-selected="false" href="#content-tab">Content > General > Id</a>.<br/><span class="text-muted small"></span>',
		},
		afterInit:function(node, inputElement) {
			var selector = Vvveb.StyleManager.getSelectorForElement(node);
			var elements = $(selector, window.FrameDocument);

			if (elements.length <= 1) {
				inputElement.hide();
			} else {
				$(".elements-count", inputElement).html(elements.length);
				$(".text-muted", inputElement).html(selector);
				
				$(".id-input", inputElement).click(function (){
					$(".content-tab a").each(function() {
						this.click();
					});
					
					setTimeout(function () { $("[name=id]").trigger("focus") }, 700);;
					
				});
				
				$(".linked-elements-hover", inputElement).
				on("mouseenter", function (){
					elements.css("outline","2px dotted blue");
				}).
				on("mouseleave", function (){
					elements.css("outline","");
				});
			}
		},	 
	 }, {
        name: "Display",
        key: "display",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: SelectInput,
        validValues: ["block", "inline", "inline-block", "none"],
        data: {
            options: [{
                value: "block",
                text: "Block"
            }, {
                value: "inline",
                text: "Inline"
            }, {
                value: "inline-block",
                text: "Inline Block"
            }, {
                value: "inline-block",
                text: "Inline Block"
            }, {
                value: "flex",
                text: "Flex"
            }, {
                value: "inline-flex",
                text: "Inline Flex"
            }, {
                value: "grid",
                text: "Grid"
            }, {
                value: "inline-grid",
                text: "Inline grid"
            }, {
                value: "table",
                text: "Table"
            }, {
                value: "table-row",
                text: "Table Row"
            }, {
                value: "list-item",
                text: "List Item"
            }, {
                value: "inherit",
                text: "Inherit"
            }, {
                value: "initial",
                text: "Initial"
            }, {
                value: "none",
                text: "none"
            }]
        }
    }, {
        name: "Position",
        key: "position",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: SelectInput,
        validValues: ["static", "fixed", "relative", "absolute"],
        data: {
            options: [{
                value: "static",
                text: "Static"
            }, {
                value: "fixed",
                text: "Fixed"
            }, {
                value: "relative",
                text: "Relative"
            }, {
                value: "absolute",
                text: "Absolute"
            }]
        }
    }, {
        name: "Top",
        key: "top",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        parent:"",
        inputtype: CssUnitInput
	}, {
        name: "Left",
        key: "left",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        parent:"",
        inputtype: CssUnitInput
    }, {
        name: "Bottom",
        key: "bottom",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        parent:"",
        inputtype: CssUnitInput
	}, {
        name: "Right",
        key: "right",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        parent:"",
        inputtype: CssUnitInput
    },{
        name: "Float",
        key: "float",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
        inline:false,
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                icon:"la la-times",
                //text: "None",
                title: "None",
                checked:true,
            }, {
                value: "left",
                //text: "Left",
                title: "Left",
                icon:"la la-align-left",
                checked:false,
            }, {
                value: "right",
                //text: "Right",
                title: "Right",
                icon:"la la-align-right",
                checked:false,
            }],
         }
	}, {
        name: "Opacity",
        key: "opacity",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
		inline:false,
        parent:"",
        inputtype: RangeInput,
        data:{
			max: 1, //max zoom level
			min:0,
			step:0.1
       },
	}, {
        name: "Background Color",
        key: "background-color",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:true,
		htmlAttr: "style",
        inputtype: ColorInput,
	}, {
        name: "Text Color",
        key: "color",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:true,
		htmlAttr: "style",
        inputtype: ColorInput,
  	}]
});    

//Typography
var ComponentBaseTypography = {
	 properties: [
     {
		key: "typography_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:"Typography"},
 
	}, {
        name: "Font size",
        key: "font-size",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Font weight",
        key: "font-weight",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "Default"
			}, {	
				value: "100",
				text: "Thin"
			}, {
				value: "200",
				text: "Extra-Light"
			}, {
				value: "300",
				text: "Light"
			}, {
				value: "400",
				text: "Normal"
			}, {
				value: "500",
				text: "Medium"
			}, {
				value: "600",
				text: "Semi-Bold"
			}, {
				value: "700",
				text: "Bold"
			}, {
				value: "800",
				text: "Extra-Bold"
			}, {
				value: "900",
				text: "Ultra-Bold"
			}],
		}
    }, {
        name: "Font family",
        key: "font-family",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
		inline:false,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "Default"
			}, {
				value: "Arial, Helvetica, sans-serif",
				text: "Arial"
			}, {
				value: '\'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
				text: 'Lucida Grande'
			}, {
				value: '\'Palatino Linotype\', \'Book Antiqua\', Palatino, serif',
				text: 'Palatino Linotype'
			}, {
				value: '\'Times New Roman\', Times, serif',
				text: 'Times New Roman'
			}, {
				value: "Georgia, serif",
				text: "Georgia, serif"
			}, {
				value: "Tahoma, Geneva, sans-serif",
				text: "Tahoma"
			}, {
				value: '\'Comic Sans MS\', cursive, sans-serif',
				text: 'Comic Sans'
			}, {
				value: 'Verdana, Geneva, sans-serif',
				text: 'Verdana'
			}, {
				value: 'Impact, Charcoal, sans-serif',
				text: 'Impact'
			}, {
				value: '\'Arial Black\', Gadget, sans-serif',
				text: 'Arial Black'
			}, {
				value: '\'Trebuchet MS\', Helvetica, sans-serif',
				text: 'Trebuchet'
			}, {
				value: '\'Courier New\', Courier, monospace',
				text: 'Courier New'
			}, {
				value: '\'Brush Script MT\', sans-serif',
				text: 'Brush Script'
			}]
		}
	}, {
        name: "Text align",
        key: "text-align",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
        inline:false,
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon:"la la-times",
                //text: "None",
                title: "None",
                checked:true,
            }, {
                value: "left",
                //text: "Left",
                title: "Left",
                icon:"la la-align-left",
                checked:false,
            }, {
                value: "center",
                //text: "Center",
                title: "Center",
                icon:"la la-align-center",
                checked:false,
            }, {
                value: "right",
                //text: "Right",
                title: "Right",
                icon:"la la-align-right",
                checked:false,
            }, {
                value: "justify",
                //text: "justify",
                title: "Justify",
                icon:"la la-align-justify",
                checked:false,
            }],
        },
	}, {
        name: "Line height",
        key: "line-height",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Letter spacing",
        key: "letter-spacing",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Text decoration",
        key: "text-decoration-line",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
        inline:false,
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                icon:"la la-times",
                //text: "None",
                title: "None",
                checked:true,
            }, {
                value: "underline",
                //text: "Left",
                title: "underline",
                icon:"la la-long-arrow-alt-down",
                checked:false,
            }, {
                value: "overline",
                //text: "Right",
                title: "overline",
                icon:"la la-long-arrow-alt-up",
                checked:false,
            }, {
                value: "line-through",
                //text: "Right",
                title: "Line Through",
                icon:"la la-strikethrough",
                checked:false,
            }, {
                value: "underline overline",
                //text: "justify",
                title: "Underline Overline",
                icon:"la la-arrows-alt-v",
                checked:false,
            }],
        },
	}, {
        name: "Decoration Color",
        key: "text-decoration-color",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:true,
		htmlAttr: "style",
        inputtype: ColorInput,
	}, {
        name: "Decoration style",
        key: "text-decoration-style",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:true,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "Default"
			}, {	
				value: "solid",
				text: "Solid"
			}, {
				value: "wavy",
				text: "Wavy"
			}, {
				value: "dotted",
				text: "Dotted"
			}, {
				value: "dashed",
				text: "Dashed"
			}, {
				value: "double",
				text: "Double"
			}],
		}
  }]
}

Vvveb.Components.extend("_base", "_base", ComponentBaseTypography);
    
//Size
var ComponentBaseSize = {
	 properties: [{
		key: "size_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:"Size", expanded:false},
	}, {
        name: "Width",
        key: "width",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Height",
        key: "height",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Min Width",
        key: "min-width",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Min Height",
        key: "min-height",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Max Width",
        key: "max-width",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Max Height",
        key: "max-height",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }]
}

Vvveb.Components.extend("_base", "_base", ComponentBaseSize);

//Margin
var ComponentBaseMargin = {
	 properties: [{
		key: "margins_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:"Margin", expanded:false},
	}, {
        name: "Top",
        key: "margin-top",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Right",
        key: "margin-right",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }, {
        name: "Bottom",
        key: "margin-bottom",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }, {
        name: "Left",
        key: "margin-left",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }]
}

Vvveb.Components.extend("_base", "_base", ComponentBaseMargin);

//Padding
var ComponentBasePadding = {

	 properties: [{
		key: "paddings_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:"Padding", expanded:false},
	}, {
        name: "Top",
        key: "padding-top",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Right",
        key: "padding-right",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }, {
        name: "Bottom",
        key: "padding-bottom",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }, {
        name: "Left",
        key: "padding-left",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }]
}

Vvveb.Components.extend("_base", "_base", ComponentBasePadding);


//Border
Vvveb.Components.extend("_base", "_base", {
	 properties: [{
		key: "border_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:"Border", expanded:false},
	 }, {        
        name: "Style",
        key: "border-style",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
		inline:false,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "Default"
			}, {	
				value: "solid",
				text: "Solid"
			}, {
				value: "dotted",
				text: "Dotted"
			}, {
				value: "dashed",
				text: "Dashed"
			}],
		}
	}, {
        name: "Width",
        key: "border-width",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
   	}, {
        name: "Color",
        key: "border-color",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
		htmlAttr: "style",
        inputtype: ColorInput,
	}]
});    



//Border radius
Vvveb.Components.extend("_base", "_base", {
	 properties: [{
		key: "border_radius_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:"Border radius", expanded:false},
	}, {
        name: "Top Left",
        key: "border-top-left-radius",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	}, {
        name: "Top Right",
        key: "border-top-right-radius",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }, {
        name: "Bottom Left",
        key: "border-bottom-left-radius",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }, {
        name: "Bottom Right",
        key: "border-bottom-right-radius",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }]
});    

//Background image
Vvveb.Components.extend("_base", "_base", {
	 properties: [{
		key: "background_image_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:"Background Image", expanded:false},
	 },{
        name: "Image",
        key: "Image",
        sort: base_sort++,
		section: style_section,
		//htmlAttr: "style",
        inputtype: ImageInput,
        
        init: function(node) {
			var image = $(node).css("background-image").replace(/^url\(['"]?(.+)['"]?\)/, '$1');
			return image;
        },

		onChange: function(node, value) {
			
			$(node).css('background-image', 'url(' + value + ')');
			
			return node;
		}        

   	}, {
        name: "Repeat",
        key: "background-repeat",
        sort: base_sort++,
		section: style_section,
		htmlAttr: "style",
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "Default"
			}, {	
				value: "repeat-x",
				text: "repeat-x"
			}, {
				value: "repeat-y",
				text: "repeat-y"
			}, {
				value: "no-repeat",
				text: "no-repeat"
			}],
		}
   	}, {
        name: "Size",
        key: "background-size",
        sort: base_sort++,
		section: style_section,
		htmlAttr: "style",
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "Default"
			}, {	
				value: "contain",
				text: "contain"
			}, {
				value: "cover",
				text: "cover"
			}],
		}
   	}, {
        name: "Position x",
        key: "background-position-x",
        sort: base_sort++,
		section: style_section,
		htmlAttr: "style",
        col:6,
		inline:true,
		inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "Default"
			}, {	
				value: "center",
				text: "center"
			}, {	
				value: "right",
				text: "right"
			}, {
				value: "left",
				text: "left"
			}],
		}
   	}, {
        name: "Position y",
        key: "background-position-y",
        sort: base_sort++,
		section: style_section,
		htmlAttr: "style",
        col:6,
		inline:true,
		inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "Default"
			}, {	
				value: "center",
				text: "center"
			}, {	
				value: "top",
				text: "top"
			}, {
				value: "bottom",
				text: "bottom"
			}],
		}
    }]
});    

/*

Vvveb.Components.extend("_base", "_base", {
	 properties: [
	 {
        name: "Font family",
        key: "font-family",
		htmlAttr: "style",
        sort: base_sort++,
        col:12,
		inline:false,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "extended"
			}, {
				value: "Ggoogle ",
				text: "google"
			}]
		}
	}]
});
*/
