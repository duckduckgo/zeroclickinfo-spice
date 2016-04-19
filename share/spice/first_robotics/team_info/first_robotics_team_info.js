(function (env) {
    
    "use strict";
    
    var last_year_competed = 0;
    
    /*env.ddg_spice_first_robotics_years_competed = function(api_result) {
        
        // Grab the most recent year the team participated from the end of the array the API returns
        if (api_result && api_result.length != 0 && api_result != null) {
            last_year_competed = api_result[api_result.length - 1];
        }
        
    };*/
    
    env.ddg_spice_first_robotics_team_info = function(api_result) {

        if (!api_result || api_result.error || api_result.length === 0 || !api_result.name) {
            return Spice.failed('first_robotics_teams');
        }
        
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
            data: api_result,
            meta: {
                sourceName: 'The Blue Alliance',
                sourceUrl: 'https://www.thebluealliance.com/team/' + api_result.team_number
            },
            normalize: function(item) {
                var team_data = {
                    'Full name': item.name,
                    'Location': item.location,
                    'Rookie year': item.rookie_year
                };
                
                // Remove space for last year competed if none is provided
                $.getJSON('/js/spice/first_robotics/years_competed/' + item.team_number, 
                     function(data) {
                        last_year_competed = data[data.length - 1];
                });
                //last_year_competed = years_competed[years_competed.length - 1];
                
                //if (last_year_competed != 0) {
                    team_data['Last competed'] = last_year_competed;
                //}
                
                // Ditto for motto
                if (item.motto && item.motto != null) {
                    team_data['Motto'] = item.motto;
                }
                
                return {
                    title: 'FIRST Robotics Competition Team ' + item.team_number,
                    subtitle: item.nickname,
                    record_data: team_data
                };
            },
            templates: {
                group: 'list',
                options: template_options
            }
        });
    };
}(this));
