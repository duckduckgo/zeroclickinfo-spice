(function (env) {
    "use strict";
    env.ddg_spice_ufc = function(api_result){

        if (!api_result) {
            return Spice.failed('ufc');
        }

        Spice.add({
            id: "ufc",
            name: "UFC",
            data: api_result.splice(0, 30),
            meta: {
                sourceName: "ufc.com",
                sourceUrl: "ufc.com",
            },
            normalize: function(item) {
                var sizedThumbnail = item.profile_image.replace(/w600-h600/,"w100-h100"), // resize image - url params
                    fullName = [item.first_name, item.last_name].join(" "); // first + last name 
                return {
                    image: sizedThumbnail,
                    title: fullName,
                    url: item.link,
                    wins: item.wins,
                    losses: item.losses,
                    draws: item.draws,
                    nickname: item.nickname,
                    weight_class: item.weight_class.replace(/_/,' ')
                };
            },
            templates: {
                group: 'media',
                detail: false,
                item_detail: false,
                options: {
                        footer: Spice.ufc.footer
                },
                variants: {
                    tileSnippet: "large"
                }
            }
        });
    };
}(this));