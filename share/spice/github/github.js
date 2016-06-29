(function(env) {
    "use strict";
    env.ddg_spice_github = function(api_result) {

        if (!api_result || !api_result.meta.status === 200) {
          return Spice.failed('github');
        }

        var results = api_result.data.items;

        if (!results) {
            return Spice.failed('github');
        }

        // Only accept results within 95% of the top scoring result
        // this allows for some disambiguation between popular forks
        var top_score = results[0].stargazers_count;

        var top_results = [results[0]];

        for (var i = 1; i < results.length; i++){
            var score = results[i].stargazers_count;
            
            if((score/top_score) < 0.70){
                break;
            }else{
                top_results.push(results[i]);
            }
        }

        $.getJSON(DDG.get_asset_path('github', 'fatheads.json'), function (data) { 
            
            var fatheads = data;

            DDG.require("moment.js", function(){
            
                Spice.add({
                    id: "github",
                    name: "Software",
                    data: top_results,
                    meta: {
                        sourceUrl: 'https://www.github.com/' + results.full_name,
                        sourceName: 'GitHub',
                        rerender: [ 'description', 'image' ]
                    },
                    templates: {
                            group: 'info',
                            item_detail: false,
                            options: {
                                moreAt: true,
                                footer: Spice.github.footer
                            },
                            variants: {
                                tile: 'basic4'
                            }
                        },
                    relevancy: {
                        primary: [
                            { required: 'description' }
                        ]
                    },
                    normalize: function (item) {
                        var key = item.full_name.replace(/^.*\//, '');
                        var infoboxData = [
                            {label: "Clone URL", value: item.clone_url},
                            {label: "SSH URL", value: item.ssh_url},
                            {label: "Last Update", value: get_days(item.pushed_at)},
                            {label: "Stars", value:  item.stargazers_count},
                            {label: "Forks", value: item.forks }, 
                            {label: "Open Issues", value: item.open_issues},
                            {label: "Default Branch", value: item.default_branch} 
                        ];

                        return {
                            title: key,
                            url: item.html_url,
                            imageTile: true,
                            infoboxData: infoboxData
                        }

                    },
                    onItemShown: function(item){
                        var key = item.title;
                        if(!fatheads[key]){
                            return;
                        }
                        var apiReq = fatheads[key].url + "&o=json";
                        
                        // check if abstract is set already to avoid calling
                        // api again if we switch tabs
                        if(!fatheads[key].abstract){
                            $.getJSON(apiReq,
                                function(data){
                                    fatheads[key].image = data.Image;
                                    fatheads[key].abstract = data.Abstract;

                                    if(fatheads[key].abstract){
                                        item.set({ 
                                            description : fatheads[key].abstract, 
                                            image: fatheads[key].image
                                        });
                                    }
                                });
                        }
                    }
                });
                
                function get_days(date) {
                    var last_update = new Date(date),
                    now = new Date(),
                    elapsed_days = days(now - last_update);
                    
                    if (elapsed_days <= 1){
                        return "Today";
                    }
                    else{
                        return Math.ceil(elapsed_days) + " days ago";
                    }
                }
                
                function days(ms) {
                    return ms/84400000;
                }
            });
        });
    }
}(this));
