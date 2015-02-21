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
            
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            api_result.month = months[parseInt(api_result.month)-1];
    
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
                }
            });
        });
        
        if(is_mobile) {
            document.getElementsByClassName("xkcd--date")[0].style.display='none';
        }
        
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
