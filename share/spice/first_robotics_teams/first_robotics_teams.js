(function (env) {
    "use strict";
    env.ddg_spice_first_robotics_teams = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.length === 0) {
            return Spice.failed('first_robotics_teams');
        }

        // Render the response
        Spice.add({
            id: "first_robotics_teams",

            // Customize these properties
            name: "Reference",
            data: api_result,
            meta: {
                sourceName: "The Blue Alliance",
                sourceUrl: 'https://www.thebluealliance.com/team/' + api_result[team_number]
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: item.title,
                    subtitle: item.subtitle,
                    image: item.icon
                };
            },
            templates: {
                group: 'list',
                options: {
                    content: Spice.first_robotics_teams.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
