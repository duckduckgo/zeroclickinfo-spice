(function (env) {
    "use strict";
    env.ddg_spice_twitter = function (api_result) {

        if(!api_result || (!api_result.current_status && !api_result.description)) {
            return Spice.failed('twitter');
        }

        // Fetch bigger profile image
        var bigger_picture = function(image) {
            return image.replace(/_normal\./, "_bigger.");
        }

        // Get array of URL text and URL
        function getURL(item) {
            var url = DDG.getProperty(item, 'entities.url.urls.0.url');
            var text = DDG.getProperty(item, 'entities.url.urls.0.display_url');
            if (url) {
                return [{
                   text: text,
                   href: url
                }];
            } else {
                return "No website provided";
            }
        }

        Spice.add({
            id: 'twitter',
            data: api_result,
            name: 'Social',
            signal: 'high',
            meta: {
                sourceUrl: "https://twitter.com/" + api_result.user,
                sourceName: "Twitter",
            },
            normalize: function(item) {
                return {
                    image: bigger_picture(item.profile_image),
                    title: item.name,
                    subtitle: ["@" + item.user, item.location],
                    altSubtitle: getURL(item),
                    description: item.description
                };
            },
            templates: {
                group: 'icon',
                options: {
                    moreAt: true
                },
                variants: {
                    iconTitle: 'large',
                    iconImage: 'large'
                }
            }

        });
    };
}(this));