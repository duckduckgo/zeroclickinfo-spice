(function (env) {
    "use strict";
    env.ddg_spice_coderwall = function(api_result){

        // Check if API provided information
        if ($.isEmptyObject(api_result.data)) {
            return Spice.failed('coderwall');
        }

        Spice.add({
            id: "coderwall",
            name: "Social",
            data: api_result.data,
            meta: {
                sourceName: "Coderwall",
                sourceUrl: 'https://coderwall.com/' + api_result.data.username
            },

            normalize: function(item) {
                // Profile URL templates: {{}} is replaced with username
                var account_url = {
                    github: 'https://github.com/{{}}',
                    twitter: 'https://twitter.com/{{}}'
                };
                // Username display formats
                var account_name = {
                    twitter: '@{{}}'
                };
                var subtitles = [];
                $.each(item.accounts, function(service, name) {
                    // Check that we have a profile url template and
                    // coderwall actually provided a name instead null
                    if (account_url[service] && name) {
                        subtitles.push({
                            href: account_url[service].replace('{{}}', name),
                            text: account_name[service]
                                ? account_name[service].replace('{{}}', name)
                                : name
                        });
                    }
                });
                if (item.title) {
                  subtitles.push(item.title);
                }
                return {
                    // Remove image for now
                    // cropped photos look bad

                    // some thumbnail URIs are relative to coderwall.com
                    // image: /^\//.test(item.thumbnail)
                    //     ? 'https://coderwall.com/' + item.thumbnail
                    //     : item.thumbnail,
                    title: item.name,
                    subtitle: subtitles,
                    altSubtitle: item.location,
                    description: item.about
                };
            },

            templates: {
                group: 'icon'
            }
        });
    };
}(this));
