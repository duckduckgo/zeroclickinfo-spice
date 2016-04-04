(function (env) {
    "use strict";
    env.ddg_spice_first_robotics_teams = function(api_result) {

        if (!api_result || api_result.error || api_result.length === 0 || !api_result.name) {
            return Spice.failed('first_robotics_teams');
        }
        
        // Fix the displaying of "null" for teams with no motto
        if (api_result.motto === null) {api_result.motto = 'No motto';}
        
        // Remove the space for a website if one isn't provided
        var template_options = {
            content: 'record',
            moreAt: true
        };
        if (api_result.website && api_result.website != null) {
            template_options.moreText = {
                text: 'Team website',
                href: api_result.website
            };
        }
        
        Spice.add({
            id: 'first_robotics_teams',
            name: 'Reference',
            data: {
                title: 'FIRST Robotics Competition Team ' + api_result.team_number,
                subtitle: api_result.nickname,
                record_data: {
                    'Full name': api_result.name,
                    'Location': api_result.location,
                    'Rookie Year': api_result.rookie_year,
                    'Motto': api_result.motto
                }
            },
            meta: {
                sourceName: 'The Blue Alliance',
                sourceUrl: 'https://www.thebluealliance.com/team/' + api_result.team_number
            },
            templates: {
                group: 'list',
                options: template_options
            }
        });
    };
}(this));
