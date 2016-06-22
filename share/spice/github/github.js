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

        results.infoboxData = [
            {label: "Stars", value:  results.stargazers_count},
            {label: "Forks", value: results.forks }, 
            {label: "Open Issues", value: results.open_issues},
            {label: "Last Update", value: results.pushed_at}
        ];

        var key = results.full_name.replace(/^.*\//, '');
        var fatheads = {
                "jquery": "?q=jquery&ia=about",
                "react": "?q=react+javascript+library&ia=about",
                "opencv": "?q=opencv&ia=about",
                "bootstrap": "?q=bootstrap+front-end+framework&ia=about"
        };

        results.title = key;
        results.url = results.html_url;
        results.imageTile = true;

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
                    var apiReq = fatheads[key] + "&o=json";
                    if(!fatheads[key]){
                        return;
                    }
                    console.log(apiReq);
                    $.getJSON(apiReq,
                        function(data){
                           item.set({ 
                               description : data.Abstract, 
                               image: data.Image
                           });
                        }
                   );
                }
            });

    }
}(this));
