(function (env) {
    "use strict";
    env.ddg_spice_coderwall = function(api_result){

        // Check if API provided information
        if ($.isEmptyObject(api_result.user)) {
            return Spice.failed('coderwall');
        }

        Spice.add({
            id: "coderwall",
            name: "Social",
            data: api_result.user,
            meta: {
                sourceName: "Coderwall",
                sourceUrl: 'https://coderwall.com/' + api_result.user.username
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
                $.each(item, function(service, name) {
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
                    image: item.thumbnail,
                    title: item.name,
                    subtitle: subtitles,
                    altSubtitle: item.location,
                    description: item.about
                };
            },

            templates: {
                group: 'icon',
                variants: {
                    iconImage: 'large'
                },
                options: {
                    content: DDH.coderwall.content
                }
            }
        });
    };

    Spice.registerHelper("coderwall_parse_md", function(value){
        var result = [];
        if (!value) {
            return;
        } else {
            // no cross site scripting
            value = Handlebars.Utils.escapeExpression(value);
            value.split(/\n+/).forEach(function(line) {
                // exclude lines that are only whitespace characters
                if (/[a-z0-9]/.test(line)) { // Github flavored MD
                    line = line.replace(/(__(.+?)__|\*\*(.+?)\*\*)/g, '<strong>$2$3</strong>') // bold
                        .replace(/(_(.+?)_|\*(.+?)\*)/g, '<em>$2$3</em>') // italicize
                        .replace(/&#x60;(.+?)&#x60;/g, '<code>$1</code>') // monospace (unicode for ` grave accent)
                        .replace(/~~(.+?)~~/g, '<del>$1</del>') // strikethrough
                        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="tx-clr--dk2">$1</a>'); // create links
                    result.push(line);
                }
            });
            result = result.join('<br>'); //add linebreaks
            return new Handlebars.SafeString(result);
        }
    });

}(this));
