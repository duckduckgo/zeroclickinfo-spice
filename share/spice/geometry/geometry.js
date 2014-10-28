(function(env){
    "use strict";

    function getParameter(query, trigger){
        var regex, result;
        regex = new RegExp("(?:" + trigger + ")\\s*[=:]?\\s*(\\d+(?:[.,]\\d+)?)");
        //(?:trigger)\s?[=:]?\s? => matches the name of the formula, following by optional whitespace, = or :, whitespace
        //(\d+(?:[.,]\d+)?) => matches the number, as integer or float

        result = query.match(regex);
        if(result === null) return null; //no match
        result = result[1].replace(",", "."); //stores the result as string and replace commas with points
        result = parseFloat(result);

        return result;
    }

    function format(number){
        //maximal three decimal places
        return parseFloat(number.toFixed(3));
    }

    function bindHoverPair(pair){
        function enter(){
            pair[0].addClass("hover");
            pair[1].each(function(){
                this.classList.add("hover");
            });
        }
        function leave(){
            pair[0].removeClass("hover");
            pair[1].each(function(){
                this.classList.remove("hover");
            });
        }
        pair = [$(pair[0]), $(pair[1])];

        pair[0].hover(enter, leave);
        pair[1].hover(enter, leave);
    }

    var formulas = {
        area: "A",
        perimeter: "u",
        diagonal: "e"
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
            pairs: [
                [0, 0],
                [1, 1],
                [2, 2]
            ],
            getParameter: function(query){
                return getParameter(query, 'a|length|size');
            },
            parameterName: "a"
        }
    };

    env.ddg_spice_geometry = function(){
        var query = DDG.get_query(),
            shape,
            data = {},
            pairs,
            i, l,
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
        data.parameter = shape.getParameter(query);
        data.parameterName = shape.parameterName;

        for(i = 0, l = data.formulas.length; i < l; ++i){
            data.formulas[i].symbol = formulas[data.formulas[i].name];
            data.formulas[i].name = DDG.capitalize(data.formulas[i].name);
            if(data.parameter !== null)
                data.formulas[i].result = format(data.formulas[i].calc(data.parameter));
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
            }
        });
        var content = Spice.getDOM("geometry"),
            formulaNodes = $("#zci--geometry-formulas", content).children(),
            svg = $("#zci--geometry-svg", content),
            svgNodes = svg.children();

        for(i = 0, l = pairs.length; i < l; ++i)
            bindHoverPair([formulaNodes[pairs[i][0]], svgNodes[pairs[i][1]]]);

        $(window).load(function(){
            svg.height(content.height());
            svg.show();
        });
    };
}(this));
