(function(env){
    "use strict";
    env.ddg_spice_xkcd_display = function(api_result){
        if (!api_result.img || !api_result.alt) {
            return Spice.failed('xkcd');
        }

        //calls our endpoint to get the number of the latest comic
        $.getJSON('/js/spice/xkcd/latest/', function(data){

            //if we are looking at the latest comic, don't display the 'next' link
            api_result.has_next = parseInt(data.num) > parseInt(api_result.num);

            // Add exception for comic 1335.
            if(api_result.num === 1335) {
                api_result.img = 'http://imgs.xkcd.com/comics/now/12h30m.png';
            }
            
            if(api_result.month === "1") {
                api_result.month='January';
            }
            else if(api_result.month === "2") {
                api_result.month='February';
            }
            else if(api_result.month === "3") {
                api_result.month='March';
            }
            else if(api_result.month === "4") {
                api_result.month='April';
            }
            else if(api_result.month === "5") {
                api_result.month='May';
            }
            else if(api_result.month === "6") {
                api_result.month='June';
            }
            else if(api_result.month === "7") {
                api_result.month='July';
            }
            else if(api_result.month === "8") {
                api_result.month='August';
            }
            else if(api_result.month === "9") {
                api_result.month='September';
            }
            else if(api_result.month === "10") {
                api_result.month='October';
            }
            else if(api_result.month === "11") {
                api_result.month='November';
            }
            else if(api_result.month === "12") {
                api_result.month='December';
            }
    
            Spice.add({
                id: 'xkcd',
                data: api_result,
                name: 'Comics',
                meta: {
                    sourceUrl: 'http://xkcd.com/' + api_result.num,
                    sourceName: 'xkcd',
                    sourceIcon: true
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.xkcd_display.content,
                        moreAt: true
                    }
                },
                onShow: function(){
                    //we can't change the "more at" link in handlebars, so add the explainxkcd.com link
                    //on initial page load.
                    if ($('.xkcd--explain-link').length === 0){
                        var explainLink = '<a class="xkcd--explain-link zci__more-at--info" href="http://www.explainxkcd.com/wiki/index.php/' +
                            api_result.num + '"> <span class="zcm__sep"></span> Explain</a>';
                        $('.zci--xkcd .zci__body').append(explainLink);
                    }
                }
            });
        });
    }

    //gets the number for the previous comic
    Spice.registerHelper("xkcd_previousNum", function(num, options) {
        if(num > 1) {
            return options.fn({num: num - 1});
        }
    });

    //gets the number for the next comic 
    Handlebars.registerHelper("xkcd_nextNum", function(num, options) {
        return options.fn({num: num + 1});
    });
}(this));
