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

        var templateObj = {};
        if(top_results.length > 1){
            templateObj = { 
                group: 'text',
                detail: false,
                item_detail: false,
                options : {
                    footer: Spice.github.footer
                },
                variants: {
                    tile: 'basic4'
                }
            };
        }
        else {
            templateObj = {
                group: "info"
            };
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
                    templates: templateObj,
                    relevancy: {
                        primary: [
                            { required: 'description' }
                        ]
                    },
                    normalize: function (item) {
                        var key = item.full_name.replace(/^.*\//, '');
                        var lastUpdate = moment(item.pushed_at).fromNow();
                        var infoboxData = [
                            {label: "Clone URL", value: item.clone_url},
                            {label: "SSH URL", value: item.ssh_url},
                            {label: "Last Update", value: lastUpdate},
                            {label: "Stars", value:  item.stargazers_count},
                            {label: "Forks", value: item.forks }, 
                            {label: "Open Issues", value: item.open_issues},
                            {label: "Default Branch", value: item.default_branch} 
                        ];

                        var subtitle;
                        if(top_results.length > 1){
                            subtitle = item.full_name;
                        }
                        return {
                            title: key,
                            url: item.html_url,
                            imageTile: true,
                            infoboxData: infoboxData,
                            lastUpdate: lastUpdate,
                            subtitle: subtitle
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
            });
        });
    }
}(this));
