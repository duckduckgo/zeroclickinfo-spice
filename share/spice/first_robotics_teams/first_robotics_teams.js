(function (env) {
    "use strict";
    env.ddg_spice_first_robotics_teams = function(api_result) {

        if (!api_result || api_result.error || api_result.length === 0) {
            return Spice.failed('first_robotics_teams');
        }
            
        //var teamNumber = api_result.team_number;
        if (api_result.motto === null) {api_result.motto = 'none';}
        else {api_result.motto = '\"'+api_result.motto+'\"'}
        
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
                sourceUrl: 'https://www.thebluealliance.com/team/' + api_result.team_number,
            },

            templates: {
                group: 'list',
                options: {
                    content: 'record',
                    moreAt: true,
                  
                    // Refer to the team's website
                    moreText: {
                        text: 'Team website',
                        href: api_result.website
                    }
                }
            }
        });
    };
}(this));
