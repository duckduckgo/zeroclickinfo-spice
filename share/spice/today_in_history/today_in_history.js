(function (env) {
    "use strict";
    env.ddg_spice_today_in_history = function(api_response) {

        if (!api_response) {
            return Spice.failed('today_in_history');
        }
    
        // Extract our query	
        var script = $('[src*="/js/spice/today_in_history/"]')[0],
        source = $(script).attr('src'),
        ourquery = source.match(/today_in_history\/([^\/]+)/)[1];
        ourquery = ourquery.replace("_", " ");    
    
        // Extract data
        var item
        for (var key in api_response.query.pages) {
            if (api_response.query.pages[key].hasOwnProperty("revisions"))
                item = api_response.query.pages[key].revisions[0]["*"];
        }

        if(!item) {
            return Spice.failed('today_in_history');
        }

        // Extract the data we want to organize    	
        var temp_a = item.split("==Events==");
        var temp_b = temp_a[1].split("==Births==");
        var temp_c = temp_b[1].split("==Deaths==");
        var temp_d = temp_c[1].split("==Holidays and observances==");
        
        var events = $.trim(temp_b[0]).split("\n");
      
        // We will use these when we get the filters
        // var births = $.trim(temp_c[0]).replace(/\<\!--(.|\n)*/,"").split("\n");
        // var deaths = $.trim(temp_d[0]).replace(/\<\!--(.|\n)*/,"").split("\n");
    

        // Organize data in array
        var temp;
        var array = [];
        var temp_string;
        for (var i = 0; i < events.length; i++) {
            temp = events[i].split(" &ndash; ");
            temp_string = (temp.slice(1)).join(" ");
            if (temp_string.length > 0) {
                array.push( {year: temp[0].replace(/\*/,""), str: temp_string, ttype: "event"});
            }
        }
        
        Spice.add({
            id: "today_in_history",
            name: "Today in History",
            data: array,
            meta: {
                itemType: "historical events for " + ourquery,
                sourceUrl: 'http://en.wikipedia.org/wiki/'+ ourquery,
                sourceName: 'Wikipedia',
                minItemsForModeSwitch: '9999',
            },
            templates: {
                group: 'base',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.today_in_history.content
                }
            },
            onShow: function() {
                // Toggle for tile
                var selector = Spice.getDOM("today_in_history").find(".string.t-m");
                selector.each(function() {
                      if ($(this)[0].scrollHeight > $(this).innerHeight()) {
                   //       $(this).parent().children(".year").append('<div id="circ" class="circle circle_p ddgsi ddgsi-plus"></div>').click(function() {
                   //           var text = $(this).parent().children("#event");
                   //           $(this).children("#circ").toggleClass('special');
                              var pxi = $(this).parent().children("#today_in_history_event")[0].scrollHeight /  $(this).parent().children("#today_in_history_event").innerHeight();
                   //           if($(this).children("#circ").hasClass('special')) {
                                  $(this).parent().parent().css( "width", (pxi * 15) + "em");
                   //           }
                   //           else {
                   //               $(this).parent().parent().css( "width", "15em" );
                   //           }
                         // });
                      }
                });
             // Deferred this part till we get filters done
             // Spice.getDOM("today_in_history").find(".zci__metabar__primary-text.js-metabar-primary").append('<div class="filters">Events <span style="font-size:0.8em">▼</span>  |</div><span class="filters">| Oldest First <span style="font-size:0.8em;">▼</span>  |</span><span class="filters">All Time Periods <span style="font-size:0.8em;">▼</span></span>');
            }
        });
    }
    

    Handlebars.registerHelper('wiki_text_to_html', function(string, num) {
        return new Handlebars.SafeString(string
            .replace(/\*?\s*\[\[(.*?)\]\]/g, function (m, l) { // internal link or image
                var parsed_value = l.split(/\|/);
                var link = parsed_value.shift();

                return '<a class="tx-clr--dk" href="' + link + '"> ' + (parsed_value.length ? parsed_value.join('|') : link) + '</a>';
            })

            .replace(/\*?\s*\{\{(.*?)\}\}/g, function (m, l) {
                var parsed_value = l.split(/\|/);
                var text;
                var link;

                if (parsed_value[0] == "convert")
                {
                    return " " + parsed_value[1] + " " + parsed_value[2];
                }
                
                if (parsed_value.length == 4) {
                    parsed_value.splice(-1,1);
                }

                if (parsed_value.length == 2)
                {
                    link = parsed_value.join("_");
                    text = parsed_value.join(" ");
                }

                if (parsed_value.length == 3)
                {
                    parsed_value[2] = "(" + parsed_value[2] + ")";
                    link = parsed_value.join("_");
                    parsed_value.splice(-1,1);
                    text = parsed_value.join(" ");
                }

                return '<a class="tx-clr--dk" href="' + link + '"> ' + text + '</a>';
            })
        
            .replace(/'''(.*?)'''/g, function (m, l) {
                return '<strong>' + l + '</strong>';
            })
    
            .replace(/''(.*?)''/g, function (m, l) {
                return '<em>' + l + '</em>';
            })
        ); 
    });

} (this));
