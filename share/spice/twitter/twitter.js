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
                var subtitle = ["@" + item.user];
                if (item.location) {
                    subtitle.push(item.location);
                }
                var follow_cnt = "Followers: ";
                if(item.followers_count >= 1000000000) {
                    follow_cnt += ((item.followers_count/1000000000).toFixed(2)).toString() + " B";
                }
                else if(item.followers_count >= 1000000) {
                    follow_cnt += ((item.followers_count/1000000).toFixed(2)).toString() + " M";
                }
                else if(item.followers_count >= 1000) {
                    follow_cnt += ((item.followers_count/1000).toFixed(2)).toString() + " K";
                }
                else {
                    follow_cnt += item.followers_count.toString();
                }
                subtitle.push(follow_cnt);

                return {
                    image: bigger_picture(item.profile_image),
                    title: item.name,
                    subtitle: subtitle,
                    altSubtitle: getURL(item),
                    url: "https://twitter.com/" + item.user,
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
