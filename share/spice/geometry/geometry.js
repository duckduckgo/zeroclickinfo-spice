(function(env){
    "use strict";

    function getParameter(query, trigger, count){
        var regex, result;
        if(!count){
            regex = new RegExp("(?:" + trigger + ")\\s*[=:]?\\s*(\\d+(?:[.,]\\d+)?)");
            //(?:trigger)\s?[=:]?\s? => matches the name of the formula, following by optional whitespace, = or :, whitespace
            //(\d+(?:[.,]\d+)?) => matches the number, as integer or float

            result = query.match(regex);
            if(result === null) return null; //no match
            result = result[1].replace(",", "."); //stores the result as string and replace commas with points
            result = parseFloat(result);

            return result;
        } else {
            regex = new RegExp("(?:" + trigger + ")\\s*[=:]?\\s*((?:\\d+(?:[.,]\\d+)?)(?:[,;]?\\s+\\d+(?:[.,]\\d+)?){" + count + "})");
            //(?:trigger)\s?[=:]?\s? => matches the name of the formula, following by optional whitespace, = or :, whitespace
            //(\d+(?:[.,]\d+)?) => matches the first number, as integer or float
            //(?:[,;]?\s+\d+(?:[.,]\d+)?){count} => matches all other numbers, as integer or float

            result = query.match(regex);
            if(result === null) return null; //no match
            result = result[1].split(/\s+/); //split up the numbers
            for(var i = 0, l = result.length; i < l; ++i){
                result[i].replace(",", ".");
                result[i] = parseFloat(result[i]);
            }

            return result;
        }
    }

    function format(number){
        //maximal three decimal places
        return parseFloat(number.toFixed(3));
    }

    function bindHoverPair(formulaNode, svgNode, color){
        function enter(){
            formulaNode.addClass("hover");
            //set the fill/ stroke color for svg nodes
            svgNode.each(function(){
                this.classList.add("hover");
            });
            if(svgNode.is(".fill"))
                svgNode.css("fill", color);
            if(svgNode.is(".stroke"))
                svgNode.css("stroke", color);
        }
        function leave(){
            formulaNode.removeClass("hover");
            svgNode.each(function(){
                this.classList.remove("hover");
            });
            if(svgNode.is(".fill"))
                svgNode.css("fill", "transparent");
            if(svgNode.is(".stroke"))
                svgNode.css("stroke", "#000");
        }
        formulaNode = $(formulaNode);
        svgNode = $(svgNode);

        formulaNode.hover(enter, leave);
        svgNode.hover(enter, leave);
    }

    var formulas = {
        volume: {
            symbol: "V",
            color: "#DE5833"
        },
        area: {
            symbol: "A",
            color: "#F1A031"
        },
        surface: {
            symbol: "A",
            color: "#F1A031"
        },
        perimeter: {
            symbol: "u",
            color: "#5B9E4D"
        },
        circumference: {
            symbol: "u",
            color: "#5B9E4D"
        },
        diagonal: {
            symbol: "e",
            color: "#4495D4"
        }
    };

    var shapes = {
        square: {
            formulas: [{
                name: "area",
                html: "a<sup>2</sup>",
                calc: function(a){
                    return a * a;
                }
            }, {
                name: "perimeter",
                html: "4a",
                calc: function(a){
                    return 4 * a;
                }
            }, {
                name: "diagonal",
                html: "a&radic;2",
                calc: function(a){
                    return a * Math.SQRT2;
                }
            }],
            svg: [{
                path: "M 0,0 h 120 v 120 h -120 z",
                class: "fill"
            }, {
                path: "M 0,0 h 120 m 0,120 h -120 m 120,0 v -120 m -120,0 v 120",
                class: "stroke"
            }, {
                path: "M 0,0 l 120,120",
                class: "stroke special"
            }],
            pairs: {
                area: [0, 0],
                perimeter: [1, 1],
                diagonal: [2, 2]
            },
            getParameter: function(query){
                return getParameter(query, "a|length|size");
            },
            parameterNames: ["a"]
        },
        rect: {
            formulas: [{
                name: "area",
                html: "ab",
                calc: function(a, b){
                    return a * b;
                }
            }, {
                name: "perimeter",
                html: "2(a+b)",
                calc: function(a, b){
                    return 2 * (a + b);
                }
            }, {
                name: "diagonal",
                html: "&radic;(a<sup>2</sup>+b<sup>2</sup>)",
                calc: function(a, b){
                    return Math.sqrt(a * a + b * b);
                }
            }],
            svg: [{
                path: "M 0,0 h 160 v 120 h -160 z",
                class: "fill"
            }, {
                path: "M 0,0 h 160 m 0,120 h -160 m 160,0 v -120 m -160,0 v 120",
                class: "stroke"
            }, {
                path: "M 0,0 l 160,120",
                class: "stroke special"
            }],
            pairs: {
                area: [0, 0],
                perimeter: [1, 1],
                diagonal: [2, 2]
            },
            getParameter: function(query){
                var p = getParameter(query, "length|size", 1);
                if(p !== null)
                    return p;

                p = [
                    getParameter(query, "a"),
                    getParameter(query, "b")
                ];
                if(p[0] !== null && p[1] !== null)
                    return p;
                return null;
            },
            parameterNames: ["a", "b"]
        },
        "equilateral triangle": {
            formulas: [{
                name: "area",
                html: "(a<sup>2</sup>*&radic;3)/4",
                calc: function(a){
                    return a / 4 * Math.sqrt(3);
                }
            }, {
                name: "perimeter",
                html: "3a",
                calc: function(a){
                    return a * 3;
                }
            }],
            svg: [{
                path: "M 70,0 l 70,120 h -140 z",
                class: "fill"
            }, {
                path: "M 70,0 l 70,120 m -140,0 l 70,-120 m 70,120 h -140",
                class: "stroke"
            }],
            pairs: {
                area: [0, 0],
                perimeter: [1, 1]
            },
            getParameter: function(query){
                return getParameter(query, "a|length|size");
            },
            parameterNames: ["a"]
        },
        circle: {
            formulas: [{
                name: "area",
                html: "&pi;r<sup>2</sup>",
                calc: function(r){
                    return Math.PI * r * r;
                }
            }, {
                name: "circumference",
                html: "2&pi;r",
                calc: function(r){
                    return 2 * Math.PI * r;
                }
            }],
            svg: [{
                path: "M 0,60 a 25 25 0 0 0 120,0 a 25 25 0 0 0 -120,0",
                class: "fill"
            }, {
                path: "M 0,60 a 25 25 0 0 0 120,0 a 25 25 0 0 0 -120,0",
                class: "stroke"
            }],
            pairs: {
                area: [0, 0],
                circumference: [1, 1]
            },
            getParameter: function(query){
                var r = getParameter(query, "radius|r");
                if(r !== null) return r;
                r = getParameter(query, "diameter|d");
                if(r !== null) return r / 2;
                return null;
            },
            parameterNames: ["r"]
        },
        cube: {
            formulas: [{
                name: "volume",
                html: "a<sup>3</sup>",
                calc: function(a){
                    return a * a * a;
                }
            }, {
                name: "surface",
                html: "6a<sup>2</sup>",
                calc: function(a){
                        return 6 * a * a;
                }
            }, {
                name: "diagonal",
                html: "a&radic;3",
                calc: function(a){
                    return a * Math.sqrt(3);
                }
            }],
            svg: [{
                path: "M 0,120 v -80 l 40,-40 h 80 v 80 l -40 40 z",
                class: "fill"
            }, {
                path: "M 0,120 l 40,-40 v -80 v 80 h 80",
                class: "stroke backface"
            }, {
                path: "M 0,40 l 120,40",
                class: "stroke special"
            }, {
                path: "M 0,120 v -80 l 40,-40 h 80 v 80 l -40 40 z",
                class: "fill"
            }, {
                path: "M 0,40 h 80 v 80 h -80 v -80 l 40,-40 h 80 v 80 l -40,40 v -80 l 40,-40",
                class: "stroke"
            }],
            pairs: {
                surface: [1, 0],
                diagonal: [2, 2],
                volume: [0, 3]
            },
            getParameter: function(query){
                return getParameter(query, "a|length|size");
            },
            parameterNames: ["a"]
        },
        cuboid: {
            formulas: [{
                name: "volume",
                html: "abc",
                calc: function(a, b, c){
                    return a * b * c;
                }
            }, {
                name: "surface",
                html: "2(ab + ac + bc)",
                calc: function(a, b, c){
                    return 2 * (a * b + a * c + b * c);
                }
            }, {
                name: "diagonal",
                html: "&radic;(a<sup>2</sup> + b<sup>2</sup> + c<sup>2</sup>)",
                calc: function(a, b, c){
                    return Math.sqrt(a * a + b * b + c * c);
                }
            }],
            svg: [{
                path: "M 0,120 v -80 l 40,-40 h 120 v 80 l -40 40 z",
                class: "fill"
            }, {
                path: "M 0,120 l 40,-40 v -80 v 80 h 120",
                class: "stroke backface"
            }, {
                path: "M 0,40 l 160,40",
                class: "stroke special"
            }, {
                path: "M 0,120 v -80 l 40,-40 h 120 v 80 l -40 40 z",
                class: "fill"
            }, {
                path: "M 0,40 h 120 v 80 h -120 v -80 l 40,-40 h 120 v 80 l -40,40 v -80 l 40,-40",
                class: "stroke"
            }],
            pairs: {
                surface: [1, 0],
                diagonal: [2, 2],
                volume: [0, 3]
            },
            getParameter: function(query){
                var p = getParameter(query, "length|size", 2);
                if(p !== null) return p;

                p = [
                    getParameter(query, "a"),
                    getParameter(query, "b"),
                    getParameter(query, "c")
                ];
                if(p[0] !== null && p[1] !== null && p[2] !== null)
                    return p;
                return null;
            },
            parameterNames: ["a", "b", "c"]
        },
        sphere : {
            formulas: [{
                name: "volume",
                html: "4/3&pi;r<sup>3</sup>",
                calc: function(r){
                    return 4 / 3 * Math.PI * r * r * r;
                }
            }, {
                name: "surface",
                html: "4&pi;r<sup>2</sup>",
                calc: function(r){
                    return 4 * Math.PI * r * r;
                }
            }],
            svg: [{
                path: "M 0,60 a 25 25 0 0 0 120,0 a 25 25 0 0 0 -120,0",
                class: "fill"
            }, {
                path: "M 0,60 a 30 10 0 0 1 120,0",
                class: "stroke backface"
            }, {
                path: "M 0,60 a 25 25 0 0 0 120,0 a 25 25 0 0 0 -120,0",
                class: "fill"
            }, {
                path: "M 0,60 a 30 10 0 1 0 120,0 a 25 25 0 0 0 -120,0 a 25 25 0 0 0 120,0",
                class: "stroke"
            }],
            pairs: {
                volume: [0, 2],
                surface: [1, 0]
            },
            getParameter: function(query){
                var r = getParameter(query, "radius|r");
                if(r !== null) return r;
                r = getParameter(query, "diameter|d");
                if(r !== null) return r / 2;
                return null;
            },
            parameterNames: ["r"]
        },
        cylinder : {
            formulas: [{
                name: "volume",
                html: "&pi;r<sup>2</sup>h",
                calc: function(r, h){
                    return Math.PI * r * r * h;
                }
            }, {
                name: "surface",
                html: "2&pi;r(h + r)",
                calc: function(r, h){
                    return 2 * Math.PI * r * (h + r);
                }
            }],
            svg: [{
                path: "M 0,60 a 25 25 0 0 0 120,0 a 25 25 0 0 0 -120,0",
                class: "fill"
            }, {
                path: "M 0,60 a 30 10 0 0 1 120,0",
                class: "stroke backface"
            }, {
                path: "M 0,60 a 25 25 0 0 0 120,0 a 25 25 0 0 0 -120,0",
                class: "fill"
            }, {
                path: "M 0,60 a 30 10 0 1 0 120,0 a 25 25 0 0 0 -120,0 a 25 25 0 0 0 120,0",
                class: "stroke"
            }],
            pairs: {
                volume: [0, 2],
                surface: [1, 0]
            },
            getParameter: function(query){
                var r = getParameter(query, "radius|r");
                var h = getParameter(query, "height|h");
                if(r !== null) return r;
                if(h !== null) return h;
                r = getParameter(query, "diameter|d");
                if(r !== null) return r / 2;
                return null;
            },
            parameterNames: ["r", "h"]
        },
        cone : {
            formulas: [{
                name: "volume",
                html: "1/3&pi;r<sup>2</sup>h",
                calc: function(r, h){
                    return 1 / 3 * Math.PI * r * r * h;
                }
            }, {
                name: "surface",
                html: "&pi;r(l + r)",
                calc: function(r, l){
                    return Math.PI * r * (l + r);
                }
            }],
            svg: [{
                path: "M 0,60 a 25 25 0 0 0 120,0 a 25 25 0 0 0 -120,0",
                class: "fill"
            }, {
                path: "M 0,60 a 30 10 0 0 1 120,0",
                class: "stroke backface"
            }, {
                path: "M 0,60 a 25 25 0 0 0 120,0 a 25 25 0 0 0 -120,0",
                class: "fill"
            }, {
                path: "M 0,60 a 30 10 0 1 0 120,0 a 25 25 0 0 0 -120,0 a 25 25 0 0 0 120,0",
                class: "stroke"
            }],
            pairs: {
                volume: [0, 2],
                surface: [1, 0]
            },
            getParameter: function(query){
                var r = getParameter(query, "radius|r");
                var l = getParameter(query, "slant height|l");
                if(r !== null) return r;
                if(l !== null) return l;
                var h = getParameter(query, "height|h");
                if(h !== null) return Math.sqrt(l * l - r * r);
                r = getParameter(query, "diameter|d");
                if(r !== null) return r / 2;
                return null;
            },
            parameterNames: ["r", "h", "l"]
        }   
    };

    env.ddg_spice_geometry = function(){
        var query = DDG.get_query(),
            shape,
            data = {},
            pairs,
            parameter,
            i, l,
            j, k,
            got = false;

        for(shape in shapes){
            if(query.match(shape)){
                got = true;
                break;
            }
        }

        if(!got){   //failed, no shape was matched
            Spice.failed("geometry");
            return;
        }

        shape = shapes[shape];

        data.formulas = shape.formulas;
        data.svg = shape.svg;
        pairs = shape.pairs;
        parameter = shape.getParameter(query);
        if(DDG.isNumber(parameter)) //force array
            parameter = [parameter];

        //loop through all formulas of this shape
        for(i = 0, l = data.formulas.length; i < l; ++i){
            //get the formula symbol, color and format the name
            data.formulas[i].symbol = formulas[data.formulas[i].name].symbol;
            data.formulas[i].color = formulas[data.formulas[i].name].color;
            data.formulas[i].nameCaps = data.formulas[i].name.toUpperCase();
            //calc the formula if parameter(s) is / are defined
            if(data.parameter !== null)
                data.formulas[i].result = format(data.formulas[i].calc.apply(0, parameter));

            //if the formula is in the search string, print only this formula
            if(query.match(data.formulas[i].name, "i")){
                //cleanup formulas
                data.formulas = [data.formulas[i]];
                //cleanup pairs
                for(j = 0, k = pairs.length; j < k; ++j){
                    //find the right pair
                    if(pairs[j][0] === i){
                        pairs = [[0, pairs[j][1]]];
                        break;
                    }
                }
                break;
            }
        }

        //if parameter(s) is / are defined print their values
        if(parameter !== null){
            data.parameter = [];
            for(i = 0, l = parameter.length; i < l; ++i){
                data.parameter[i] = {
                    symbol: shape.parameterNames[i],
                    value: parameter[i]
                };
            }
        }

        // Display the plugin.
        Spice.add({
            data: data,
            id: "geometry",
            name: "Geometry",
            templates: {
                group: "base",
                options: {
                    content: Spice.geometry.content
                }
            },
            onShow: function(){
                if(!Modernizr.svg) return;

                var formulaNodes = $("#zci--geometry-formulas").children(),
                    svg = $("#zci--geometry-svg"),
                    svgNodes = svg.children(),
                    content = svg.parent();

                for(var i in pairs)
                    bindHoverPair(formulaNodes[pairs[i][0]], svgNodes[pairs[i][1]], formulas[i].color);

                //wait for stylesheet
                $(window).load(function(){
                    //set the height of the svg to the same like the content, but 150 as maximal value
                    svg.height(Math.min(content.height(), 150));
                    svg.show();
                });
            }
        });
    };
}(this));

ddg_spice_geometry();
