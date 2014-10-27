(function(env){
    "use strict";

    env.ddg_spice_geometry = function(){
        var data = {
            formulas: [{
                name: "Area",
                symbol: "A",
                formula: "a\u00B2"
            }, {
                name: "Perimeter",
                symbol: "u",
                formula: "4a"
            }, {
                name: "Diagonal",
                symbol: "e",
                formula: "a\u221A2"
            }],
            svg: [{
                path: "M 0,0 h 120 v 120 h -120 z",
                class: "fill",
                symbol: "A"
            }, {
                path: "M 0,0 h 120 m 0,120 h -120 m 120,0 v -120 m -120,0 v 120",
                class: "stroke",
                symbol: "u"
            }, {
                path: "M 0,0 l 120,120",
                class: "stroke special",
                symbol: "e"
            }]
        };

        // Display the plugin.
        Spice.add({
            data: data,
            id: "geometry",
            templates: {
                group: "base",
                options: {
                    content: Spice.geometry.content
                }
            }
        });
        var content = Spice.getDOM("geometry"),
            svg = $("#zci--geometry-svg", content);

        $(window).load(function(){
            svg.height(content.height());
            svg.show();
        });
    };
}(this));

ddg_spice_geometry();
