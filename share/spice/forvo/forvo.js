(function (env) {
    "use strict";

    // The sex (returned as either "m" or "f") should be expanded.
    Handlebars.registerHelper("forvo_sex", function(sex) {
        "use strict";

        if(sex === "m")
            return "Male";

        return "Female";
    });

    Handlebars.registerHelper("forvo_icon", function(code) {
        if (code !== undefined){
            var code = code.toLowerCase();
        }
        return DDG.settings.region.getSmallIconURL(code);
    });

    env.ddg_spice_forvo = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('forvo');
        }

        if (api_result.attributes.total < 1) return;

        var has_shown = 0;
        var script = $('[src*="/js/spice/forvo/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/forvo\/([^\/]+)\/\w+/)[1];
        query = decodeURIComponent(query);

        DDG.require('audio', function(){
            Spice.add({
                id: "forvo",
                name: "Pronunciation",
                data: {
                    list: api_result.items
                },
                meta:{
                    sourceName: "Forvo",
                    sourceUrl: "http://forvo.com/search/" + query,
                },
                templates: {
                    group: 'list',
                    options: {
                        list_content: Spice.forvo.forvo,
                        moreAt: true
                    }
                },
                normalize: function(item) {
                    return {
                        title: 'Pronunciations of ' + query
                    };
                },
                onShow: function () {
                    if (has_shown) {
                        return;
                    }

                    // Create click handler on first click
                    // Required because of how "Show More" works
                    $(".zci--forvo").on("click", ".js-play-btn", function(e) {
                        var $el = $(e.currentTarget);

                        if ($el.data("has-button")) {
                            return;
                        }

                        var btn = new DDG.Views.PlayButton({
                            $el: $el
                        });
                        btn.play();
                        $el.data("has-button", true);
                    });

                    // Clicking word acts as click on play button
                    $(".zci--forvo").on("click", ".word", function(e) {
                        $(this).prev(".play-btn").click();
                    });

                    has_shown = 1;
                 }
            });
        });
    };
}(this));
