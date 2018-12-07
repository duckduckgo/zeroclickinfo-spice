(function(env) {
    "use strict";
    env.ddg_spice_experimentalia = function(api_result) {
        
        if (!api_result) {
          return Spice.failed('experimentalia');
        }

        api_result = $.extend(api_result['spice'], api_result['goodies'], api_result['fathead']);
        var results = [];

        for(var property in api_result){
            if(property == 'ExperimentalIA'){
                continue;
            }

            // tiles with topics
            var ia = api_result[property];
            if(ia['meta'] && ia['meta']['name'] && ia['date']){
                var date = parse_date(ia['date']);
                api_result[property]['answerItemTopic'] = date;
            }
                results.push(api_result[property]);
        }

        // sort the results so tiles display in order 
        results.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });

        DDG.require("moment.js", function(){
            Spice.add({
                id: "experimentalia",
                name: "Experimental IAs",
                data: results,
                meta: {
                    itemType : "experimental IAs",
                    sourceUrl: 'https://duck.co/ia',
                    sourceName: 'Duck.co',
                    minTopicsForMenu: 1
                },
                templates: {
                    group: 'icon',
                    item_detail : 'basic_info_detail',
                    options: {
                        content: Spice.experimentalia.content,
                        footer: Spice.experimentalia.footer,
                        moreAt: false
                    },
                    variants: {
                        tileFooter: "2line"
                    }
                },
                normalize: function(item) {
                    var m_date = moment(item.utc_date),
                        rel_date = m_date.fromNow(),
                        creation_date = m_date.format("MMM D, YYYY");
                    
                    var meta_copy = item.meta;
                    delete item.meta;
                    
                    if(meta_copy.perl_module == 'DDG::Goodie::CheatSheets'){
                        meta_copy.ia_tab = "cheatsheet";
                        meta_copy.example_query = meta_copy.example_query || meta_copy.name;
                    }
                   
                    var url = "/?q=" + encodeURIComponent(meta_copy.example_query);
                    meta_copy.ia_tab ? url = url + "&ia=" + meta_copy.ia_tab : url = url + "&ia=answer";
                    item.install_status = item.install_status || "success";

                    return {
                        title: meta_copy.name,
                        url: url,
                        altSubtitle: meta_copy.repo,
                        pushed_at: rel_date,
                        created_at: creation_date,
                        creator: item.user,
                        icon: item.img || "https://avatars.githubusercontent.com/u/0?v=3",
                        pr: item.pr,
                        ia_meta: meta_copy,
                        install_status: item.install_status,
                        install_class: item.install_status === "success" ? "tx-clr--green" : "tx-clr--red-light"
                    };
                }
            });
        });
        
        function parse_date(date) {
           var ia_date = new Date(date),
               now = new Date(),
               elapsed_days = days(now - ia_date);

           if (elapsed_days <= 1){
               return "Today";
           } else if (elapsed_days > 1 && elapsed_days <= 7) {
               return "Last 7 days";
           } else if (elapsed_days > 7 && elapsed_days <= 30) {
               return "Last 30 days";
           } else if (elapsed_days > 30) {
               return "Older than 30 days";
           }
        }

        function days(ms) {
            return ms/84400000;
        }
    };
}(this));
