(function (env) {
    "use strict";
    env.ddg_spice_newint = function(api_result){

        if (api_result.error) {
            return Spice.failed('newint');
        }

        Spice.add({
            id: "newint",
            name: "Newint",
            data: api_result,
            meta: {
                itemType: "Magazines",
                sourceName: "digital.newint.com.au",
                sourceUrl: 'https://digital.newint.com.au/issues'
            },
            normalize: function(item){
                var month_names = new Array("January", "February", "March", 
                    "April", "May", "June", "July", "August", "September", 
                    "October", "November", "December");
                return {
                    release_date: month_names[DDG.getDateFromString(item.release).getMonth()] + " " + DDG.getDateFromString(item.release).getFullYear()
                };
            },
            templates: {
                group: 'base',
                detail: false,
                options:{
                    content: Spice.newint.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
