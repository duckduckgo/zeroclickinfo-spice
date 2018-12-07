(function(env){
    "use strict";
    
    function build_comic_number(number) {
        var comic_number_string = "";
        if (number) {
            comic_number_string = "#" + number + " created on "
        }
        
        return comic_number_string;
    }
    
    function build_created_date(month, day, year) {
        var created_date_string = "";
        if (month) {
            created_date_string += month + " ";
        }
        if (day) {
            created_date_string += day + ", ";
        }
        if (year) {
            created_date_string += year;
        }
        
        return created_date_string
    }
    
    function build_comic_number_and_created_date_string(number, month, day, year) {
        var comic_number_and_created_date_string = "";
        
        comic_number_and_created_date_string += build_comic_number(number);
        comic_number_and_created_date_string += build_created_date(month, day, year)
        
        return comic_number_and_created_date_string;
    }
    
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
            
            // #1137 returns â®LTR from the API (http://xkcd.com/1137/info.0.json), where it should really be the right-to-left override character (&#8238)
            if (api_result.num === 1137) {
                api_result.title = 'RTL';
            }

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            api_result.month = months[parseInt(api_result.month)-1];
            
            // Get a random, valid XKCD comic
            api_result.random_xkcd_number = Math.floor(Math.random() * data.num) + 1;
    
            Spice.add({
                id: 'xkcd',
                data: api_result,
                name: 'Comics',
                meta: {
                    sourceUrl: 'http://xkcd.com/' + api_result.num,
                    sourceName: 'xkcd',
                    sourceIcon: true
                },
                normalize: function(item) {
                    var subtitles = [];
                    
                    subtitles.push(build_comic_number_and_created_date_string(item.num, item.month, item.day, item.year));
                    
                    if (item.num > 1) {
                        subtitles.push({ href: "/?q=xkcd+"+(item.num-1), text: "Previous" });
                    }
                    
                    if (item.has_next) {
                        subtitles.push({ href: "/?q=xkcd+"+(item.num+1), text: "Next" });
                    }
                    
                    subtitles.push({ href: "/?q=xkcd+"+item.random_xkcd_number, text: "Random" });
                    
                    subtitles.push({ href: "http://www.explainxkcd.com/wiki/index.php/"+item.num, text: "Explain it!" });
                    
                    return {
                        title: item.title,
                        subtitle: subtitles,
                    }
                },
                templates: {
                    group: 'text',
                    options: {
                        content: Spice.xkcd_display.content,
                        moreAt: true
                    }
                }
            });
            
            if (is_mobile) {
                $('.zci--xkcd .c-base__sub .sep').first().replaceWith("<br>");
            }
        });
        
    }
}(this));
