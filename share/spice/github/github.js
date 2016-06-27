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

        if (results.length)
            results = results[0];

        var key = results.full_name.replace(/^.*\//, '');
        results.title = key;
        results.url = results.html_url;
        results.imageTile = true;
        
        var fatheads;
        $.getJSON(DDG.get_asset_path('github', 'fatheads.json'), function (data) { fatheads = data; });

        DDG.require("moment.js", function(){
            results.infoboxData = [
                {label: "Clone URL", value: results.clone_url},
                {label: "SSH URL", value: results.ssh_url},
                {label: "Last Update", value: get_days(results.pushed_at)},
                {label: "Stars", value:  results.stargazers_count},
                {label: "Forks", value: results.forks }, 
                {label: "Open Issues", value: results.open_issues},
                {label: "Default Branch", value: results.default_branch}
                
            ];
        
            Spice.add({
                id: "github",
                name: "Software",
                data: results,
                meta: {
                    sourceUrl: 'https://www.github.com/' + results.full_name,
                    sourceName: 'GitHub',
                    rerender: [ 'description', 'image' ]
                },
                templates: {
                        group: 'info',
                        options: {
                            moreAt: true
                        }
                    },
                relevancy: {
                    primary: [
                        { required: 'description' }
                    ]
                },
                onItemShown: function(item){
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
                            
                                item.set({ 
                                    description : fatheads[key].abstract, 
                                    image: fatheads[key].image
                                });
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
    }
}(this));
